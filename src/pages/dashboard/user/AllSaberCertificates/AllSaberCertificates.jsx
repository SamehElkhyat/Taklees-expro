import React, { useState, useEffect } from "react";
import PaginationComponent from "../../../../Component/shared/PaginationComponent.jsx";
import {
  Eye,
  Download,
  Search,
  X,
  FileText,
  PlusCircle,
  MessageCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { GetSaberCertificate } from "../../../../store/Slice/SaberCertificateReducer";
import ChannelConnection from "../../../../features/Chat/ChannelConnection";
import AutoChatbot from "../../../../features/Chat/AutoChatbot";
import DetailsForCertification from "../../../../Component/shared/DetailsForCertification.jsx";
// Mock data for Saber certificates

const CertificateCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
    <div className="bg-gray-50 p-4 flex justify-end gap-3">
      <div className="h-8 bg-gray-200 rounded w-20"></div>
      <div className="h-8 bg-gray-200 rounded w-20"></div>
    </div>
  </div>
);

const AllSaberCertificates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(1);
  const [selectedCert, setSelectedCert] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [showAutoChatbot, setShowAutoChatbot] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const GetAllSaber = async () => {
    setLoading(true);
    const { payload } = await dispatch(GetSaberCertificate(currentPage));
    if (payload && payload.data) {
      const transformedData = payload.data.map((item) => ({
        id: item.id,
        certificateNumber: `SABER-ID-${item.id}`,
        comanyName: item.comanyName || "غير محدد",
        productName: item.productName || item.subject || "غير محدد",
        productImage: item.productImage,
        crImage: item.crImage,
        hsCode: item.hsCode,
        phoneNumber: item.phoneNumber,
        email: item.email,
        userId: item.userId,
        description: item.description,
        createdAt: item.createdAt,
        status: "صالح", // Default status
        issueDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString("ar-SA") : new Date().toLocaleDateString("ar-SA"),
        expiryDate: item.createdAt 
          ? new Date(new Date(item.createdAt).setFullYear(new Date(item.createdAt).getFullYear() + 1)).toLocaleDateString("ar-SA")
          : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString("ar-SA"),
      }));
      setCertificates(transformedData);
      setCurrentPage(payload.pageNumber);
      setPerPage(payload.pageSize);
      setTotalPages(payload.totalPages);
    }
    setLoading(false);
  };
  useEffect(() => {
    GetAllSaber();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetAllSaber();
  }, [currentPage]);

  const handleViewDetails = (cert) => {
    setSelectedCert(cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };
  const handleStartChat = () => {
    setShowChat(true);
  };

  

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            شهادات سابر
          </h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowAutoChatbot(true)}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              <span>المساعد الآلي</span>
            </button>
            <button className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center gap-2">
              <PlusCircle size={20} />
              <span>إضافة شهادة جديدة</span>
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث برقم الشهادة، اسم المنتج، اسم الشركة، أو البريد الإلكتروني..."
                className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Loading Skeletons or Certificates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: perPage }).map((_, index) => (
              <CertificateCardSkeleton key={index} />
            ))}
          </div>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter((cert) => 
                searchTerm === "" ||
                cert.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.certificateNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.comanyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.hsCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cert.email?.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((cert, index) => (
              <div
                key={cert.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transform hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {cert.productName}
                    </h2>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {cert.certificateNumber}
                  </p>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">اسم الشركة:</span>
                      <span className="text-sm">{cert.comanyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">رمز HS:</span>
                      <span className="text-sm">{cert.hsCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">البريد الإلكتروني:</span>
                      <span className="text-sm truncate max-w-32">{cert.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">رقم الهاتف:</span>
                      <span className="text-sm">{cert.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">تاريخ الإصدار:</span>
                      <span className="text-sm">{cert.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">تاريخ الانتهاء:</span>
                      <span className="text-sm">{cert.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 flex justify-end gap-3">
                  <button
                    onClick={() => handleViewDetails(cert)}
                    className="flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                  >
                    <Eye size={16} />
                    <span>عرض</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-green-600 font-semibold hover:text-green-800 transition-colors">
                    <Download size={16} />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-md col-span-full">
            <FileText className="mx-auto h-16 w-16 text-gray-300" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">
              لم يتم العثور على شهادات
            </h3>
            <p className="mt-2 text-gray-500">جرّب تعديل البحث أو الفلاتر.</p>
          </div>
        )}

        {/* Pagination */}
          <div >
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        
      </div>

      {/* Details Modal */}
      {selectedCert && !showChat && (
        <DetailsForCertification
          selectedCert={selectedCert}
          handleCloseModal={handleCloseModal}
          handleStartChat={handleStartChat}
        />
      )}

      {/* Start Chat Modal */}
      {showChat && (
        <>
          <ChannelConnection
            selectedChat={selectedCert}
            handleCloseModal={handleCloseModal}
          />
        </>
      )}

      {/* AutoChatbot Modal */}
      <AutoChatbot
        isOpen={showAutoChatbot}
        handleClose={() => setShowAutoChatbot(false)}
      />

      {/* Floating AutoChatbot Button */}
      {!showAutoChatbot && (
        <button
          onClick={() => setShowAutoChatbot(true)}
          className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center z-50"
          title="المساعد الآلي للاستفسارات"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default AllSaberCertificates;
