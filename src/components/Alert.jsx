"use client";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import alertStyles from "@/styles/alert.module.css";

export default function Alert({ open, onClose }) {
  return (
    <AlertDialog.Root open={open} onClose={onClose}>
      <AlertDialog.Overlay className={alertStyles.overlay} />
      <AlertDialog.Content className={alertStyles.content}>
        <p className="pb-5">You have already liked this post</p>
        <button className="button" onClick={onClose}>
          Close
        </button>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
