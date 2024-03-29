import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

type Props = {
  isOpen: boolean;
  handleMenuClick: () => void;
  logoChange: boolean;
};

const AppDesktopNavBar: React.FC<Props> = ({
  isOpen,
  handleMenuClick,
  logoChange,
}) => {
  const commonImageProps = {
    alt: "Main logo",
    width: 200,
    height: 200,
  };

  return (
    <div className="md:flex justify-between align-middle items-center hidden gap-5">
      <Link href="/">
        <Image
          src={logoChange ? "/logoBlack.png" : "/logoMain.png"}
          {...commonImageProps}
        />
      </Link>
      <div className="align-middle items-center flex gap-5">
        <Image
          src="/partner.png"
          alt="Main logo"
          width={250}
          height={250}
          className="object-cover"
        />
        {logoChange ? (
          <AiOutlineClose
            className="text-3xl text-White cursor-pointer"
            onClick={handleMenuClick}
          />
        ) : (
          <AiOutlineMenu
            className="text-3xl text-BlueLighter cursor-pointer"
            onClick={handleMenuClick}
          />
        )}
      </div>
    </div>
  );
};

export default AppDesktopNavBar;
