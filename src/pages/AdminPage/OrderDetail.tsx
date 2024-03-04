function OrderDetail() {
  return (
    <div className="sm:container grid lg:px-6 sm:px-4 px-2 mx-auto">
      <h1 className="my-6 text-lg font-bold text-gray-700 "> Invoice </h1>
      <div className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <div>
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 ">
            <h1 className="font-bold font-serif text-xl uppercase">
              Invoice
              <p className="text-xs mt-1 text-gray-500">
                Status
                <span className="pl-2 font-medium text-xs capitalize">
                  {" "}
                  <span className="font-serif">
                    <span className="inline-flex px-2 text-xs font-medium leading-5 rounded-full text-yellow-600 bg-yellow-100 ">
                      Precessing
                    </span>
                  </span>
                </span>
              </p>
            </h1>
            <div className="lg:text-right text-left">
              <p className="text-sm text-gray-500  mt-2">
                59 Station Rd, Purls Bridge, United Kingdom <br></br>019579034
                <br></br>
                <span> kachabazar@gmail.com </span> <br></br>
                kachabazar-admin.vercel.app
              </p>
            </div>
          </div>
          <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                DATE
              </span>
              <span className="text-sm text-gray-500  block">Dec 16, 2023</span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
              <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                INVOICE NO
              </span>
              <span className="text-sm text-gray-500  block">#10656</span>
            </div>
            <div className="flex flex-col lg:text-right text-left">
              <span className="font-bold font-serif text-sm uppercase text-gray-600  block">
                INVOICE TO
              </span>
              <span className="text-sm text-gray-500  block">
                Jjgujhh Gjghuu <br></br>ghjh@gjjk.khj{" "}
                <span className="ml-2">5555555555</span>
                <br></br>Fcghhcc<br></br>Ghhhbh, Ghjhhhh, Fuhhhhhg
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full overflow-hidden border border-gray-200  rounded-lg my-8">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100 ">
                  <tr>
                    <td className="px-4 py-2 text-center">SR.</td>
                    <td className="px-4 py-2 text-center">Product Title</td>
                    <td className="px-4 py-2 text-center">QUANTITY</td>
                    <td className="px-4 py-2 text-center">ITEM PRICE</td>
                    <td className="px-4 py-2 text-center">AMOUNT</td>
                  </tr>
                </thead>
                <tbody className="text-gray-800  bg-white  divide-y divide-gray-100 text-serif text-sm my-2">
                  <tr className="my-2">
                    <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                      1{" "}
                    </td>
                    <td className="whitespace-nowrap font-normal text-gray-500 text-center my-2">
                      <span className="text-gray-700 font-semibold  text-xs text-center my-2">
                        Calabaza Squash
                      </span>
                    </td>
                    <td className="whitespace-nowrap font-bold text-center my-2">
                      1{" "}
                    </td>
                    <td className="whitespace-nowrap font-bold text-center my-2">
                      98.03
                    </td>
                    <td className="whitespace-nowrap font-bold text-red-500 text-center my-2">
                      98.03
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 ">
          <div className="flex lg:flex-row md:flex-row flex-col justify-between">
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                PAYMENT METHOD
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                Cash
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                SHIPPING COST
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                €60.00
              </span>
            </div>
            <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                DISCOUNT
              </span>
              <span className="text-sm text-gray-500  font-semibold font-serif block">
                €0.00
              </span>
            </div>
            <div className="flex flex-col sm:flex-wrap">
              <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600  block">
                TOTAL AMOUNT
              </span>
              <span className="text-xl font-serif font-bold text-red-500  block">
                €158.03
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 mt-3 flex justify-between">
        <a
          download="Invoice"
          href="blob:https://dashtar-admin.netlify.app/7960d228-1573-4e2d-856d-5b4bc39a5cd6"
        >
          <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent w-auto cursor-pointer">
            Download Invoice
            <span className="ml-2 text-base">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M320 336h76c55 0 100-21.21 100-75.6s-53-73.47-96-75.6C391.11 99.74 329 48 256 48c-69 0-113.44 45.79-128 91.2-60 5.7-112 35.88-112 98.4S70 336 136 336h56m0 64.1l64 63.9 64-63.9M256 224v224.03"
                ></path>
              </svg>
            </span>
          </button>
        </a>
        <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent w-auto">
          Print Invoice
          <span className="ml-2">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default OrderDetail;
