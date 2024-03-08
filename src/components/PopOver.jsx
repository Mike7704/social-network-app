"use client";
import * as Popover from "@radix-ui/react-popover";
import popoverStyles from "@/styles/popover.module.css";

export default function PopoverDemo() {
  return (
    <Popover.Root>
      <Popover.Trigger className={popoverStyles.PopoverTrigger}>More info</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className={popoverStyles.PopoverContent} sideOffset={5}>
          Some more info…
          <Popover.Arrow className={popoverStyles.PopoverArrow} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
