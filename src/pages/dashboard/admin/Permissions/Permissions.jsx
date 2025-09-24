import * as React from "react";
import { ToggleButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Form, Card, Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Import, Share2 } from "lucide-react"; // أيقونة مشاركة
import PaginationComponent from "../../../../Component/shared/PaginationComponent";
export default function Permissions() {
  const [users, setUsers] = useState([]);
  const [premisionsarr, setPremisionsarr] = useState([]);
  const [Bar, setBar] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const [Premetions, setPremetions] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedPermissions, setSelectedPermissions] = useState({
    accountant: false,
    CustomerService: false,
    Statestics: false,
    Clients: false,
    Tracing: false,
    BlackList: false,
  });
  const MangerPrimetions = [];

  const handleToggle = (e) => {
    MangerPrimetions.push(e.target.value);
  };
  const handleCloseBar = () => {
    setBar(null);
    setPremetions(null);
  };
  const HandlePremetions = async (e) => {
    setPremetions(e.target.value);
  };
  const HandlePremetionsManger = async (e) => {
    MangerPrimetions.push(e.target.value);
  };

  const GetId = (index, OrderId) => {
    setOrderId(OrderId);
    setBar(index);
    Premissions(OrderId);
  };

  const Premissions = async (page = 1) => {
    try {
      const safePage = Number.isInteger(page) && page > 0 ? page : 1;

      const params = new URLSearchParams({ page: safePage });

      const url = `${
        process.env.REACT_APP_API_URL
      }/Get-Permissions/${page}`;

      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      setPremisionsarr(data.data || data);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    }
  };

  const changePremetions = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Change-Roles`,
        {
          ID: OrderId,
          roleName: Premetions,
        },
        {
          withCredentials: true,
        }
      );
      toast(data.message);
      setBar(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error changing permissions:", error);
      toast.error("خطأ في تغيير الصلاحيات");
    }
  };

  const DeletePremetions = async (value) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_API_URL}/Delete-Permissions`,
        {
          ID: OrderId,
          NameOfPermissions: [value.target.value],
        },
        {
          withCredentials: true,
        }
      );
      toast(data.message);
      setPremisionsarr(data.data);
    } catch (error) {
      console.error("Error deleting permissions:", error);
      toast.error("خطأ في حظر المستخدم");
    }
  };

  const changePremetionsManger = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/Set-Permissions`,
        {
          ID: OrderId,
          NameOfPermissions: MangerPrimetions,
        },
        {
          withCredentials: true,
        }
      );

      toast(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    } finally {
      setIsLoading(false);
    }
  };

  const CustomerService = async (page = 1) => {
    setLoading(true);
    try {
      const safePage =
        Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1;
      const params = new URLSearchParams({ page: safePage });
      const url = `${
        process.env.REACT_APP_API_URL
      }/Get-All-Peaple-Admin/${page}`;
      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      setUsers(data.data || data);
      setTotalPages(data.totalPages || 1);
      setTotalUsers(data.totalUser || data.length);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast.error("خطأ في جلب بيانات العملاء");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    CustomerService();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    CustomerService(page);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    CustomerService(1);
  };

  return (
    <Card className="p-2 sm:p-3 md:p-4 shadow-lg rounded text-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2, transition: { duration: 1.7 } }}
        exit={{ opacity: 0 }}
      >
        <h2
          className="text-xl font-bold mb-4 text-center"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}
        >
          إدارة الصلاحيات
        </h2>

        {/* Responsive container for buttons and search */}
        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 mb-6">
          {/* Buttons container */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center gap-2">
            <button className="flex items-center justify-center gap-2 bg-[#00AEEF] text-white text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
              <Share2
                size={20}
                className="transform scale-x-[-1] sm:w-6 sm:h-6"
              />
              <span className="hidden sm:inline">مشاركة</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[transparent] text-black border border-[var(--maincolor--)] text-base sm:text-lg font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-[15px] w-full sm:w-[141px] h-[45px] sm:h-[55px]">
              <Import size={20} className="sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">تصدير</span>
            </button>
          </div>

          {/* Search container */}
          <div
            className="w-full lg:w-auto flex items-center justify-center"
            dir="rtl"
          >
            <div className="w-full max-w-2xl p-2 sm:p-4">
              <div className="border border-2 border-blue flex items-center justify-between rounded-2xl px-3 sm:px-4 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <input
                  value={searchTerm}
                  onChange={handleSearch}
                  type="text"
                  placeholder="ابحث عن طلب (الموقع، النوع، الحالة)"
                  className="flex-1 text-right bg-transparent outline-none text-black placeholder:text-gray-400 text-sm sm:text-base"
                />
                <div className="flex items-center gap-1 sm:gap-2 text-black">
                  <span className="text-sm sm:text-lg font-medium hidden sm:inline">
                    بحث
                  </span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users count info */}
        <div className="mb-4 text-center">
          <p className=" text-[#00AEEF] text-sm sm:text-base">
            إجمالي المستخدمين:{" "}
            <span className="font-bold text-blue-300">{totalUsers}</span>
          </p>
        </div>

        {/* Responsive table container */}
        <div className="table-responsive overflow-x-auto">
          <Table striped bordered hover className="w-full">
            <thead>
              <tr>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  الاسم
                </th>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  البريد الإلكتروني
                </th>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  رقم الهاتف
                </th>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  رقم الهويه
                </th>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  التخصيص
                </th>
                <th className="px-2 py-3 text-xs sm:text-sm md:text-base">
                  الصلاحية
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="mr-2">جاري التحميل...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    لا توجد بيانات للعرض
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      {user.fullName}
                    </td>
                    <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      {user.email}
                    </td>
                    <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      {user.phoneNumber}
                    </td>
                    <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      {user.identity}
                    </td>
                    <td className="px-2 py-3 text-xs sm:text-sm md:text-base">
                      {user.role}
                    </td>
                    <td className="px-2 py-3">
                      <Button
                        variant="success"
                        onClick={() => GetId(index, user.id)}
                        className="px-2 sm:px-4 py-2 rounded-pill shadow text-xs sm:text-sm md:text-base"
                      >
                        إداره الصلاحيات
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <Modal
          className="text-center"
          show={Bar !== null}
          onHide={handleCloseBar}
        >
          {/* رأس المودال مع تصميم مميز */}
          <Modal.Header
            closeButton
            className="bg-light rounded-top shadow-sm text-center"
          >
            <Modal.Title className="fs-3 fw-bold text-primary w-100 text-center d-flex justify-content-center align-items-center">
              إداره الصلاحيات
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="p-4 bg-light rounded-bottom text-center">
            {/* قسم التحميل مع زر مميز */}
            <div className="d-inline-block w-100 text-center">
              <Form.Control onClick={(e) => HandlePremetions(e)} as="select">
                <option value="">اختر نوع الطلب</option>
                <option value="Account">محاسب</option>
                <option value="Admin">مسؤول</option>
                <option value="Manager">مدير</option>
                <option value="CustomerService">خدمه عملاء</option>
                <option value="User">عميل</option>
                <option value="Broker">مخلص</option>
              </Form.Control>
            </div>

            {Premetions == "Manager" ? (
              <>
                <Modal.Title className="fs-3 fw-bold text-success w-100 text-center d-flex justify-content-center align-items-center">
                  تخصيص صلاحيات المدير
                </Modal.Title>
                <ToggleButton
                  value="accountant"
                  selected={selectedPermissions.accountant}
                  onChange={(e) => handleToggle(e)}
                >
                  اداره المحاسبين
                </ToggleButton>
                <ToggleButton
                  value="CustomerService"
                  selected={selectedPermissions.CustomerService}
                  onChange={(e) => handleToggle(e)}
                >
                  اداره خدمه العملاء
                </ToggleButton>
                <ToggleButton
                  value="Statestics"
                  selected={selectedPermissions.Statestics}
                  onChange={(e) => handleToggle(e)}
                >
                  الاطلاع علي الاحصائيات
                </ToggleButton>
                <ToggleButton
                  value="Clients"
                  selected={selectedPermissions.Clients}
                  onChange={(e) => handleToggle(e)}
                >
                  اداره العملاء
                </ToggleButton>
                <ToggleButton
                  value="Manger"
                  selected={selectedPermissions.Clients}
                  onChange={(e) => handleToggle(e)}
                >
                  اداره المديرين
                </ToggleButton>
                <ToggleButton
                  value="Tracing"
                  selected={selectedPermissions.Tracing}
                  onChange={(e) => handleToggle(e)}
                >
                  متابعه الطلبات
                </ToggleButton>
                <ToggleButton
                  value="BlackList"
                  selected={selectedPermissions.BlackList}
                  onChange={(e) => handleToggle(e)}
                >
                  الاطلاع علي المحظورين
                </ToggleButton>
                <Button
                  variant="success"
                  onClick={() => changePremetionsManger()}
                  className="px-4 py-2 rounded-pill shadow"
                >
                  تأكيد لتخصيص صلاحيات المدير
                </Button>
                <Modal.Title className="fs-3 fw-bold text-success w-100 text-center d-flex justify-content-center align-items-center">
                  تخصيصات المدير
                </Modal.Title>
                {premisionsarr.map((item) => (
                  <>
                    {item == "CustomerService" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="CustomerService"
                          selected={selectedPermissions.CustomerService}
                        >
                          اداره خدمه العملاء
                        </ToggleButton>
                      </>
                    ) : item == "Statestics" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="Statestics"
                          selected={selectedPermissions.Statestics}
                        >
                          الاطلاع علي الاحصائيات
                        </ToggleButton>
                      </>
                    ) : item == "accountant" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="accountant"
                          selected={selectedPermissions.Statestics}
                        >
                          إداره المحاسبين
                        </ToggleButton>
                      </>
                    ) : item == "Clients" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="Clients"
                          selected={selectedPermissions.Clients}
                        >
                          اداره العملاء
                        </ToggleButton>
                      </>
                    ) : item == "BlackList" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="BlackList"
                          selected={selectedPermissions.BlackList}
                        >
                          الاطلاع علي المحظورين
                        </ToggleButton>
                      </>
                    ) : item == "Tracing" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="Tracing"
                          selected={selectedPermissions.Tracing}
                        >
                          متابعه الطلبات
                        </ToggleButton>
                      </>
                    ) : item == "Manger" ? (
                      <>
                        <ToggleButton
                          onClick={(e) => DeletePremetions(e)}
                          className="position-relative"
                          id="ToggleButtonValue"
                          value="Manger"
                          selected={selectedPermissions.Manger}
                        >
                          إداره المديرين
                        </ToggleButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </>
            ) : (
              <></>
            )}
          </Modal.Body>

          <Modal.Footer className="bg-light border-0 text-center">
            <Button
              variant="success"
              onClick={() => changePremetions()}
              className="px-4 py-2 rounded-pill shadow"
            >
              تأكيد تغير الصلاحيه
            </Button>
            <Button
              variant="danger"
              onClick={handleCloseBar}
              className="px-4 py-2 rounded-pill shadow"
            >
              إغلاق
            </Button>
          </Modal.Footer>
        </Modal>
      </motion.div>

      <Toaster />
    </Card>
  );
}
