import "./mention-list.scss";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { cn } from "@/lib/tiptap-utils";
import ImageComponent from "@/components/image/ImageComponent";

export const MentionList = forwardRef((props: any, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    const { id, name } = item || {};

    if (id) {
      props.command({ id, label: name });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: any }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="dropdown-menu akd-dropdown-menu-base">
      {props.items.length ? (
        props.items.map((item: any, index: number) => {
          const {
            id,
            name,
            generatedUrl,
            avatar,
            isShowAvatar = false,
            defaultImageName,
            image_visibility,
          } = item;

          return (
            <button
              key={id}
              className={cn(
                "akd-p-1 akd-px-2 akd-rounded-md akd-cursor-pointer",
                index === selectedIndex && "is-selected"
              )}
              onClick={() => selectItem(index)}
            >
              <span className="akd-flex akd-items-center">
                {isShowAvatar && (
                  <ImageComponent
                    alt={`${name}'s avatar`}
                    className="akd-w-6 akd-h-6 akd-rounded-full akd-mr-2"
                    defaultImageName={defaultImageName}
                    generatedUrl={generatedUrl}
                    src={avatar}
                    isPrivate={image_visibility === "private"}
                  />
                )}
                <span className="akd-text-14 akd-font-medium">{name}</span>
              </span>
            </button>
          );
        })
      ) : (
        <div className="akd-text-14 akd-font-normal akd-p-1 akd-px-2">
          Nothing to show
        </div>
      )}
    </div>
  );
});

MentionList.displayName = "MentionList";
