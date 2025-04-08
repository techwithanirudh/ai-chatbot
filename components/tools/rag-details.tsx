
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CheckIcon, LoaderIcon } from "lucide-react";

interface RAGDetailsProps {
    toolName: string;
    isLoading?: boolean;
    result?: any;
    args?: any;
}

export function RAGDetails({
    toolName,
    isLoading,
    result,
    args,
}: RAGDetailsProps) {
    const action =
        toolName === "getInformation"
            ? isLoading ? "Getting information" : "Got information"
            : toolName === "understandQuery"
                ? isLoading ? "Understanding query" : "Understood query"
                : toolName === "addResource" ?
                    isLoading ? "Adding resource" : "Added resource"
                    : isLoading ? "Thinking..." : "Thought";

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring" }}
                className="overflow-hidden flex justify-start items-center"
            >
                <div className="flex flex-row gap-2 items-center text-muted-foreground [&_svg]:size-4">
                    {isLoading ? <LoaderIcon className="animate-spin" /> : <CheckIcon />}
                    <div>
                        {action}...
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
