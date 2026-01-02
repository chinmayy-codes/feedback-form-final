"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FeedbackData } from "@/components/feedback-form";

type Props = {
  data: FeedbackData;
  updateData: (updates: Partial<FeedbackData>) => void;
  onNext?: () => void;
};

const valueOptions = [
  "Excellent Value",
  "Good Value",
  "Fair Value",
  "Below Expectations",
];
const performanceOptions = [
  "Exceeded Expectations",
  "Met Expectations",
  "Partially Met",
  "Did Not Meet",
];

export function ValueAssessmentStep({ data, updateData, onNext }: Props) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-black border-b border-gray-200 pb-4">
        Value & Output Assessment
      </h2>

      <div className="space-y-10">
        <div
          className="space-y-4 animate-slide-up"
          style={{ animationDelay: "0ms" }}
        >
          <Label className="text-base font-normal text-gray-900">
            17. Overall value for money
          </Label>
          <RadioGroup
            value={data.overallValue}
            onValueChange={(value) => updateData({ overallValue: value })}
            className="space-y-3"
          >
            {valueOptions.map((option, index) => (
              <div
                key={option}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.overallValue === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`value-${index}`}
                    className={`h-5 w-5 ${
                      data.overallValue === option
                        ? "border-white text-white"
                        : ""
                    }`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div
          className="space-y-4 animate-slide-up"
          style={{ animationDelay: "50ms" }}
        >
          <Label className="text-base font-normal text-gray-900">
            18. Did the video perform well in terms of your objectives (views,
            engagement, etc.)?
          </Label>
          <RadioGroup
            value={data.performanceObjectives}
            onValueChange={(value) =>
              updateData({ performanceObjectives: value })
            }
            className="space-y-3"
          >
            {performanceOptions.map((option, index) => (
              <div
                key={option}
                className="animate-fade-in"
                style={{ animationDelay: `${50 + index * 30}ms` }}
              >
                <label
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-sm ${
                    data.performanceObjectives === option
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <RadioGroupItem
                    value={option}
                    id={`performance-${index}`}
                    className={`h-5 w-5 ${
                      data.performanceObjectives === option
                        ? "border-white text-white"
                        : ""
                    }`}
                  />
                  <span className="text-base">{option}</span>
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
