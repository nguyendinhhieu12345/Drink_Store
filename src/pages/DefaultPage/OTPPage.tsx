import { configRouter } from "@/configs/router";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function OTPPage() {
  useEffect(() => {
    document.title = "Shopfee | OTP Confirm";
  }, []);

  const [inputs, setInputs] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^[1-9]$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    } else {
      e.preventDefault();
    }

    if (
      index < inputs.length - 1 &&
      value.trim() !== "" &&
      /^[1-9]$/.test(value)
    ) {
      inputRefs.current[index + 1].focus();
    } else {
      e.preventDefault();
    }
  };

  const handleConfirmOTP = () => {
    navigate(configRouter.home);
  };

  return (
    <div className="w-full h-full bg-gray-400">
      <div className="w-auto h-[350px] flex flex-col justify-center text-black absolute top-1/4 left-[30%] shadow-md bg-white rounded-lg p-3">
        <div className="flex flex-col items-center justify-center">
          <div className="font-semibold text-2xl my-2">Test@gmail.com</div>
          <div className="mt-2">
            Enter the 6-digit OTP code that has been sent from email to complete
            your account registration
          </div>
        </div>
        <div className="container mx-auto mt-8 text-center">
          {inputs.map((input, index) => (
            <input
              key={index}
              ref={(ref) =>
                (inputRefs.current[index] = ref as HTMLInputElement)
              }
              type="text"
              value={input}
              onChange={(e) => handleChange(index, e)}
              className="border border-gray-300 rounded-md px-2 py-2 mb-4 mr-4 w-12 h-12 text-center"
            />
          ))}
        </div>
        <div className="text-center mt-2">
          Haven't got the confirmation code yet? <button>resend</button>
        </div>
        <div className="text-center my-3 w-full">
          <button
            className="bg-btnDisable text-white rounded-lg px-3 py-2 w-[45%]"
            onClick={handleConfirmOTP}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTPPage;
