import { motion } from "framer-motion";
import EntryJournalSummary from "./EntryJournalSummary";
import ExitJournalSummary from "./ExitJournalSummary";
import ReasonJournalCard from "./ReasonJournalCard";
import GenericTimelineCard from "./GenericTimelineCard";
import InfoCard from "./InfoCard";
import SellReasonReviewCard from "./SellReasonReviewCard";
import SellEvaluationCard from "./SellEvaluationCard";
import { useState, useEffect } from "react";

export default function JournalDetail({
  selected,
  onAddEntry,
  handleSellEvaluationChange,
}) {
  const [sellEvaluation, setSellEvaluation] = useState(
    selected?.sellEvaluation || {}
  );

  useEffect(() => {
    setSellEvaluation(selected?.sellEvaluation || {});
  }, [selected]);

  if (!selected) return null;
  console.log("your selected is", selected);
  return (
    <motion.div
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -10, opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
        layout: { duration: 0.4, ease: [0.25, 0.8, 0.25, 1] },
      }}
      layout
      className="flex-1 bg-white p-8 pt-4 rounded-l-xl w-full"
    >
      {selected.isEntry ? (
        <div className="flex flex-wrap gap-[2%] w-full">
          <EntryJournalSummary
            selected={selected}
          />

          <ReasonJournalCard
            checklist={selected.checklist || {}}
            useWeightedScoring
          />

          <GenericTimelineCard
            title="Mood Log"
            field="moodLog"
            entries={[...selected.moodLog].reverse() || []}
            onAddEntry={onAddEntry}
            showEmojiPicker={true}
            hasLabel={true}
            renderHeader={(entry) => entry.label}
            renderSubLabel={(entry) => entry.subLabel}
            renderContent={(entry) => entry.content}
          />

          <GenericTimelineCard
            title="Future Expectation"
            field="expectations"
            entries={[...selected.expectations].reverse() || []}
            onAddEntry={onAddEntry}
            showEmojiPicker={false}
            hasLabel={false}
            renderHeader={(entry) => entry.label}
            renderSubLabel={(entry) => entry.subLabel}
            renderContent={(entry) => entry.content}
          />

          <InfoCard
            title="Exit Plan"
            entry={[
              { label: "Reason for Exit", content: selected.exitPlan.reason },
              {
                label: "Stop Loss",
                content: `$${selected.exitPlan.stopLoss.toFixed(2)} (${selected.exitPlan.lossPercent}%)`,
              },
              { label: "Target Price", content: `$${selected.exitPlan.targetPrice.toFixed(2)}` },
              {
                label: "Risk / Reward Ratio",
                content: selected.exitPlan.rrRatio,
              },
            ]}
          />
        </div>
      ) : (
        <div className="flex flex-wrap gap-[2%] w-full">
          <ExitJournalSummary selected={selected} />

          <SellReasonReviewCard
            checklistReview={selected.checklistReview || {}}
            checklist={selected.checklist || {}}
          />

          <InfoCard
            title="Exit Summary"
            entry={[
              {
                label: "Reason for Exit",
                content: selected.exitReason || "—",
              },
              {
                label: "Trade go according to plan",
                content: selected.followedPlan || "—",
              },
            ]}
          />

          <InfoCard
            title="Trade Reflection"
            entry={
              selected.reflection ? [{ content: selected.reflection }] : []
            }
          />

          <SellEvaluationCard
            initialData={sellEvaluation}
            onChange={handleSellEvaluationChange}
          />
        </div>
      )}
    </motion.div>
  );
}
