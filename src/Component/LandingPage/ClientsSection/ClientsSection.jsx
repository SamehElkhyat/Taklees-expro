import React from "react";
import "./ClientsSection.css";

const ClientsSection = () => {
  return (
    <>
      <section className="flex flex-col md:flex-row w-full">
        {/* القسم اليمين */}
        <div className="flex flex-col justify-center items-center  w-full md:w-1/2 p-6 text-[#000000]">
          <div className="space-y-4 p-4 rounded-md w-100" dir="rtl">
            {/* Location */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white border rounded-5 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>

              <div>
                <div>الرياض</div>
                <div className="text-sm text-gray-600">
                  المملكة العربية السعودية
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse border bg-white rounded-5 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10"
              >
                <path d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
                <path d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
              </svg>

              <div>
                <div className="text-sm text-gray-600">البريد الالكتروني:</div>
                <div>ofelia61@gmail.com</div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse border bg-white rounded-5 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <div>
                <div className="text-sm text-gray-600">اتصل بنا:</div>
                <div>265-727-4097</div>
              </div>
            </div>
          </div>
        </div>

        {/* القسم اليسار */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-6 text-black text-right">
          <h2 className="font-tajawal xl:text-5xl md:text-1xl sm:text-1xl font-bold mb-5">
            هل أنت مستعد لتبسيط عملية التخليص الجمركي الخاصة بك؟
          </h2>

          <p className="max-w-md sm:text-xl text-sm sm:text-base mb-5 leading-relaxed font-tajawal">
            اتصل بفريقنا اليوم لمعرفة كيف يمكننا تبسيط عمليات التجارة الدولية
            الخاصة بك وتوفير الوقت والموارد لك.
          </p>
        </div>
      </section>
    </>
  );
};

export default ClientsSection;
