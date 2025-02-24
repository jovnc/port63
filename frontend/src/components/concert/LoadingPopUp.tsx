import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stage {
  name: string;
  status: "pending" | "in-progress" | "completed";
}

interface LoadingPopupProps {
  isOpen: boolean;
  stages: Stage[];
  onClose: () => void;
}

export function LoadingPopup({ isOpen, stages, onClose }: LoadingPopupProps) {
  const isCompleted = stages.every((stage) => stage.status === "completed");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="text-xl font-semibold mb-4">
          {isCompleted ? "Concert Created!" : "Creating Concert"}
        </DialogTitle>
        {isCompleted ? (
          <div className="text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <p className="text-md mb-6 text-muted-foreground">
              Your concert has been successfully created.
            </p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col items-center justify-center gap-4">
            {stages.map((stage, index) => (
              <div key={index} className="flex items-center space-x-3">
                {stage.status === "pending" && (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
                {stage.status === "in-progress" && (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                )}
                {stage.status === "completed" && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
                <span
                  className={
                    stage.status === "completed"
                      ? "text-muted-foreground text-sm"
                      : stage.status === "in-progress"
                      ? "font-medium text-sm"
                      : "text-sm"
                  }
                >
                  {stage.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
