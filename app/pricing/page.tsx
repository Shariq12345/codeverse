"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Star,
  Zap,
  Crown,
  Users,
  BookOpen,
  Code,
  MessageCircle,
  Shield,
  Headphones,
} from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const pricingTiers = [
    {
      name: "Free",
      description: "Perfect for getting started with coding",
      price: { monthly: 0, yearly: 0 },
      icon: BookOpen,
      iconColor: "text-emerald-500",
      cardColor: "border-emerald-200 dark:border-emerald-800",
      buttonVariant: "outline" as const,
      popular: false,
      features: [
        "Access to basic HTML & CSS tutorials",
        "Interactive code examples",
        "Community forum access",
        "Mobile-responsive learning",
        "Progress tracking",
        "Download certificates",
      ],
      limitations: ["Limited to 5 projects", "Basic support only"],
    },
    {
      name: "Pro",
      description: "For serious developers ready to advance",
      price: { monthly: 19, yearly: 190 },
      icon: Zap,
      iconColor: "text-blue-500",
      cardColor: "border-blue-200 dark:border-blue-800",
      buttonVariant: "default" as const,
      popular: true,
      features: [
        "All free features included",
        "Advanced JavaScript & React tutorials",
        "Premium project templates",
        "AI-powered code suggestions",
        "Priority support",
        "Offline access to content",
        "Live coding sessions",
        "Unlimited projects",
        "Advanced analytics",
      ],
      limitations: [],
    },
    {
      name: "Enterprise",
      description: "For teams and organizations",
      price: { monthly: 49, yearly: 490 },
      icon: Crown,
      iconColor: "text-purple-500",
      cardColor: "border-purple-200 dark:border-purple-800",
      buttonVariant: "default" as const,
      popular: false,
      features: [
        "Everything in Pro",
        "Team collaboration tools",
        "Custom learning paths",
        "White-label solutions",
        "Dedicated account manager",
        "Advanced team analytics",
        "SSO integration",
        "Custom integrations",
        "24/7 phone support",
        "On-site training options",
      ],
      limitations: [],
    },
  ];

  const getPrice = (tier: (typeof pricingTiers)[0]) => {
    return billingCycle === "monthly" ? tier.price.monthly : tier.price.yearly;
  };

  const getSavings = (tier: (typeof pricingTiers)[0]) => {
    if (tier.price.monthly === 0) return 0;
    const monthlyCost = tier.price.monthly * 12;
    const yearlyCost = tier.price.yearly;
    return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-6 py-16 lg:py-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
          >
            Pricing Plans
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Choose Your Learning
            <span className="block text-blue-600 dark:text-blue-400">
              Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
            Start for free and upgrade as you grow. Our flexible pricing adapts
            to your learning needs, whether you're a beginner or leading a
            development team.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "yearly"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Yearly
              <Badge
                variant="secondary"
                className="ml-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"
              >
                Save up to 20%
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            const price = getPrice(tier);
            const savings = getSavings(tier);

            return (
              <Card
                key={tier.name}
                className={`relative overflow-hidden border-2 ${
                  tier.cardColor
                } bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl ${
                  tier.popular ? "scale-105 lg:scale-110" : "hover:scale-105"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}

                <CardHeader
                  className={`text-center ${
                    tier.popular ? "pt-12" : "pt-8"
                  } pb-8`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${
                      tier.name === "Free"
                        ? "from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20"
                        : tier.name === "Pro"
                        ? "from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20"
                        : "from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20"
                    } mb-6`}
                  >
                    <IconComponent className={`w-8 h-8 ${tier.iconColor}`} />
                  </div>

                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </CardTitle>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline justify-center mb-6">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>

                  {billingCycle === "yearly" && savings > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300 mb-6"
                    >
                      Save {savings}% yearly
                    </Badge>
                  )}

                  <Button
                    variant={tier.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      tier.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                        : tier.name === "Free"
                        ? "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
                        : ""
                    }`}
                  >
                    {tier.name === "Free"
                      ? "Get Started Free"
                      : tier.name === "Enterprise"
                      ? "Contact Sales"
                      : "Start Pro Trial"}
                  </Button>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      What's included:
                    </h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Have questions about our pricing? We've got answers.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is there a free trial for Pro?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, we offer a 14-day free trial for the Pro plan with full
                  access to all features.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We accept all major credit cards, PayPal, and bank transfers
                  for Enterprise plans.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Do you offer student discounts?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, we offer 50% off Pro plans for verified students. Contact
                  us with your student ID.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Absolutely. You can cancel your subscription at any time with
                  no cancellation fees.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Yes, we use enterprise-grade security with 256-bit SSL
                  encryption and SOC 2 compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers with
            our comprehensive tutorials and hands-on projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Start Free Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              View All Tutorials
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
