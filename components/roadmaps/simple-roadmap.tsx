"use client";

import React, { useState, useEffect } from "react";
import { RoadmapNode } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, BookOpen, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleRoadmapProps {
  nodes: RoadmapNode[];
  roadmapSlug: string;
}

export function SimpleRoadmap({ nodes, roadmapSlug }: SimpleRoadmapProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`roadmap-${roadmapSlug}`);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {}
    }
  }, [roadmapSlug]);

  // Save progress to localStorage
  const toggleProgress = (nodeId: string) => {
    const newProgress = { ...progress, [nodeId]: !progress[nodeId] };
    setProgress(newProgress);
    localStorage.setItem(`roadmap-${roadmapSlug}`, JSON.stringify(newProgress));
  };

  // Calculate completion percentage
  const allNodes = getAllNodes(nodes);
  const completedNodes = allNodes.filter((node) => progress[node.id]);
  const completionPercentage = (completedNodes.length / allNodes.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Learning Progress</span>
            <span className="text-2xl font-bold text-primary">
              {Math.round(completionPercentage)}%
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="w-full mb-2" />
          <p className="text-sm text-muted-foreground">
            {completedNodes.length} of {allNodes.length} topics completed
          </p>
        </CardContent>
      </Card>

      {/* Roadmap Sections */}
      <div className="space-y-6">
        {nodes.map((section, index) => (
          <RoadmapSection
            key={section.id}
            section={section}
            progress={progress}
            onToggleProgress={toggleProgress}
            sectionNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

function RoadmapSection({
  section,
  progress,
  onToggleProgress,
  sectionNumber,
}: {
  section: RoadmapNode;
  progress: Record<string, boolean>;
  onToggleProgress: (nodeId: string) => void;
  sectionNumber: number;
}) {
  const sectionNodes = section.children || [];
  const completedInSection = sectionNodes.filter(
    (node) => progress[node.id]
  ).length;
  const sectionProgress =
    sectionNodes.length > 0
      ? (completedInSection / sectionNodes.length) * 100
      : 0;
  const isMainTopicCompleted = progress[section.id];

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        isMainTopicCompleted &&
          "border-green-500 bg-green-50 dark:bg-green-950/20"
      )}
    >
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
            {sectionNumber}
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
                {section.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                {sectionNodes.length > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {Math.round(sectionProgress)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {completedInSection}/{sectionNodes.length}
                    </div>
                  </div>
                )}
                <Checkbox
                  checked={isMainTopicCompleted}
                  onCheckedChange={() => onToggleProgress(section.id)}
                />
              </div>
            </div>
            {sectionNodes.length > 0 && (
              <Progress value={sectionProgress} className="w-full h-2" />
            )}
          </div>
        </div>
      </CardHeader>

      {sectionNodes.length > 0 && (
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionNodes.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                isCompleted={progress[topic.id]}
                onToggle={() => onToggleProgress(topic.id)}
              />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function TopicCard({
  topic,
  isCompleted,
  onToggle,
}: {
  topic: RoadmapNode;
  isCompleted: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
        isCompleted &&
          "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
        topic.optional && "border-dashed opacity-75"
      )}
    >
      <Checkbox
        checked={isCompleted}
        onCheckedChange={onToggle}
        className="flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-medium",
              isCompleted && "line-through text-muted-foreground"
            )}
          >
            {topic.title}
          </span>
          {topic.optional && (
            <Badge variant="outline" className="text-xs">
              Optional
            </Badge>
          )}
        </div>
      </div>
      {topic.description && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex-shrink-0 h-8 w-8 p-0"
            >
              <Info className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                {topic.title}
                {topic.optional && (
                  <Badge variant="outline" className="text-xs">
                    Optional
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
              {topic.children && topic.children.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Key Topics:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {topic.children.map((child) => (
                      <li key={child.id}>{child.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
      {isCompleted && (
        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
      )}
    </div>
  );
}

// Helper function to get all nodes recursively
function getAllNodes(nodes: RoadmapNode[]): RoadmapNode[] {
  const allNodes: RoadmapNode[] = [];

  function traverse(nodeList: RoadmapNode[]) {
    nodeList.forEach((node) => {
      allNodes.push(node);
      if (node.children) {
        traverse(node.children);
      }
    });
  }

  traverse(nodes);
  return allNodes;
}
