"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Copy, Check } from "lucide-react";

interface CodePlaygroundProps {
  initialHtml?: string;
  initialCss?: string;
  initialJs?: string;
  title?: string;
}

export function CodePlayground({
  initialHtml = "",
  initialCss = "",
  initialJs = "",
  title = "Code Playground",
}: CodePlaygroundProps) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);
  const [copied, setCopied] = useState(false);

  const generatePreview = () => {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>`;
  };

  const resetCode = () => {
    setHtml(initialHtml);
    setCss(initialCss);
    setJs(initialJs);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatePreview());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Play className="w-5 h-5" />
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="text-xs"
            >
              {copied ? (
                <Check className="w-3 h-3" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="text-xs"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="space-y-4">
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="css">CSS</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
              </TabsList>

              <TabsContent value="html" className="mt-4">
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  className="w-full h-48 p-3 font-mono text-sm border rounded-lg bg-slate-50 dark:bg-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your HTML code here..."
                />
              </TabsContent>

              <TabsContent value="css" className="mt-4">
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-48 p-3 font-mono text-sm border rounded-lg bg-slate-50 dark:bg-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your CSS code here..."
                />
              </TabsContent>

              <TabsContent value="js" className="mt-4">
                <textarea
                  value={js}
                  onChange={(e) => setJs(e.target.value)}
                  className="w-full h-48 p-3 font-mono text-sm border rounded-lg bg-slate-50 dark:bg-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your JavaScript code here..."
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Preview</h4>
              <Button size="sm" className="text-xs">
                <Play className="w-3 h-3 mr-1" />
                Run Code
              </Button>
            </div>
            <div className="border rounded-lg overflow-hidden bg-white">
              <iframe
                srcDoc={generatePreview()}
                className="w-full h-48 border-0"
                title="Code Preview"
                sandbox="allow-scripts"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
