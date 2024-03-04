import React from "react";
import assets from "../../assets";
import { X } from "@phosphor-icons/react";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Ref = HTMLDivElement;

const Sidebar = React.forwardRef<Ref, Props>(
  (props, ref): React.ReactElement => {
    return (
      <div className="relative xl:w-[60px] h-screen w-[0px] z-9999">
        <div
          className={`absolute z-9999 ${
            props.isOpen ? "w-[250px]" : "w-[60px]"
          } h-full overflow-auto shadow-sm z-50 bg-white top-0 left-0 xl:translate-x-0 ${
            props.isOpen ? "-translate-x-0" : "-translate-x-[250px]"
          } transition-all delay-200 flex flex-col px-2 py-4 gap-3`}
          ref={ref}
        >
          {/* logo */}
          <div className="relative w-full flex items-center justify-center mb-10">
            <img src={assets.images.shopfeeIcon} alt="" className="h-[40px]" />
            <div className="absolute left-3">
              <div className="rounded-full bg-gray-200 p-2 xl:hidden flex transition-all delay-200">
                <X
                  size={25}
                  className="text-gray-500"
                  onClick={() => props.setIsOpen((prev) => !prev)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Sidebar;
