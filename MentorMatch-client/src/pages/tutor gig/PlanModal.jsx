import React from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";

const PlanModal = ({ open, onClose, plan, gigId }) => {
  const navigate = useNavigate();

  if (!plan) return null;

  const handleConfirm = () => {
    navigate(
      `/dashboard/learner/payment?gig=${gigId}&plan=${encodeURIComponent(
        plan.title
      )}&price=${plan.price}&type=${plan.type}&package=${
        plan.packageName ?? ""
      }`
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{plan.title}</DialogTitle>
          <DialogDescription>Price: {plan.price} taka</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="border border-primary w-full rounded-md py-1">
            Cancel
          </DialogClose>

          <Button onClick={handleConfirm}>Confirm Booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanModal;
