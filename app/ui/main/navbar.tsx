"use client";
import { useState } from "react";
import RoundButton from "@/app/components/buttons/round-button/RoundButton";
import ButtonIcon from "@/app/components/buttons/button-icon/ButtonIcon";
import Link from "next/link";

export default function Navbar() {
  const [openWork, setOpenWork] = useState(false);
  const [openHobby, setOpenHobby] = useState(false);

  function cn(...c: Array<string | undefined>) {
    return c.filter(Boolean).join(" ");
  }

  const toggleMenuWork = () => {
    setOpenWork(!openWork);
    setOpenHobby(false);
  };

  const toggleMenuHobby = () => {
    setOpenHobby(!openHobby);
    setOpenWork(false);
  };

  const toggleFullClose = () => {
    setOpenHobby(false);
    setOpenWork(false);
  };

  const hobbyItems = [
    { name: "plane" as const, href: "/my/timeline" },
    { name: "soup" as const, href: "/my/timeline" },
    { name: "file-headphone" as const, href: "/my/timeline" },
  ];

  const workItems = [
    { name: "briefcase-business" as const, href: "/work/projects" },
    { name: "lightbulb" as const, href: "/work/ideas" },
  ];

  return (
    <div
      style={{
        display: "flex",
        overflowX: "auto",
        whiteSpace: "nowrap",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <div className="w-35">
        <Link href="/">
          <RoundButton onClick={toggleFullClose}>
            <ButtonIcon name="house" size={55} color="black" />
          </RoundButton>
        </Link>
      </div>
      <div
        style={{
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div>
          <RoundButton
            style={{ position: "relative" }}
            onClick={toggleMenuWork}
          >
            <ButtonIcon
              name="book-open-text"
              size={55}
              color="black"
              className={cn(
                "transition-transform duration-200 ease-out",
                openWork ? "rotate-45 scale-110" : "rotate-0 scale-100"
              )}
            />
          </RoundButton>
        </div>
        <div
          className={cn(
            "block gap-2 origin-top",
            openWork ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {workItems.map((it, i) => (
            <div
              key={it.name}
              className={cn(
                "transition-all duration-300 ease-out [will-change:opacity,transform] mt-2",
                openWork
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              )}
              // stagger in when opening, stagger out in reverse when closing
              style={{
                transitionDelay: openWork
                  ? `${i * 90}ms`
                  : `${(workItems.length - 1 - i) * 90}ms`,
              }}
            >
              <Link href={it.href} onClick={toggleFullClose}>
                <RoundButton>
                  <ButtonIcon name={it.name} size={55} color="black" />
                </RoundButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "block",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div>
          <RoundButton onClick={toggleMenuHobby}>
            <ButtonIcon
              name="book-user"
              size={55}
              color="black"
              className={cn(
                "transition-transform duration-200 ease-out",
                openHobby ? "rotate-45 scale-110" : "rotate-0 scale-100"
              )}
            />
          </RoundButton>
        </div>
        <div
          className={cn(
            "block gap-2 origin-top",
            openHobby ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {hobbyItems.map((it, i) => (
            <div
              key={it.name}
              className={cn(
                "transition-all duration-300 ease-out [will-change:opacity,transform] mt-2 h-29",
                openHobby
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2"
              )}
              // stagger in when opening, stagger out in reverse when closing
              style={{
                transitionDelay: openHobby
                  ? `${i * 90}ms`
                  : `${(hobbyItems.length - 1 - i) * 90}ms`,
              }}
            >
              <Link href={it.href} onClick={toggleFullClose}>
                <RoundButton>
                  <ButtonIcon name={it.name} size={45} color="black" />
                </RoundButton>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
