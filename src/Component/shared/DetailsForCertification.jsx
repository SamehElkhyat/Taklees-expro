import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { Download } from 'lucide-react'
import { MessageCircle } from 'lucide-react'

export default function DetailsForCertification({selectedCert, handleCloseModal, handleStartChat}) {
  // Disable background scroll when modal is open
  useEffect(() => {
    // Store original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Disable scrolling
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Enhanced close handler to ensure scroll is restored
  const handleClose = () => {
    document.body.style.overflow = 'auto';
    handleCloseModal();
  };

  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);
    
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in" 
      dir="rtl"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 animate-slide-in-up">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold">تفاصيل شهادة سابر</h2>
                <p className="text-white/80 text-sm">{selectedCert.certificateNumber}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        {/* Scrollable Content Area */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-8 space-y-8">
            {/* Product Header Section */}
            <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M12 1v22" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCert.productName}</h3>
                  <p className="text-slate-600 font-medium">{selectedCert.comanyName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">صالح</span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">معتمد</span>
              </div>
            </div>

            {/* Images Section */}
            {(selectedCert.productImage || selectedCert.crImage) && (
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  المرفقات والصور
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCert.productImage && (
                    <div className="group">
                      <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          صورة المنتج
                        </p>
                        <div className="relative overflow-hidden rounded-xl">
                          <img 
                            src={selectedCert.productImage} 
                            alt="صورة المنتج"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden w-full h-48 bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">لا يمكن تحميل الصورة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedCert.crImage && (
                    <div className="group">
                      <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                        <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                          صورة الشهادة
                        </p>
                        <div className="relative overflow-hidden rounded-xl">
                          <img 
                            src={selectedCert.crImage} 
                            alt="صورة الشهادة"
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="hidden w-full h-48 bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400">لا يمكن تحميل الصورة</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Certificate Details Grid */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                تفاصيل الشهادة
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">رقم الشهادة</p>
                  <p className="text-lg font-bold text-slate-900">{selectedCert.certificateNumber}</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">رمز HS</p>
                  <p className="text-lg font-bold text-slate-900">{selectedCert.hsCode}</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">رقم الهاتف</p>
                  <p className="text-lg font-bold text-slate-900 ltr">{selectedCert.phoneNumber}</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 md:col-span-2">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">البريد الإلكتروني</p>
                  <p className="text-lg font-bold text-slate-900 ltr">{selectedCert.email}</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">تاريخ الإصدار</p>
                  <p className="text-lg font-bold text-slate-900">{selectedCert.issueDate}</p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 md:col-span-2 lg:col-span-3">
                  <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">تاريخ الانتهاء</p>
                  <p className="text-lg font-bold text-slate-900">{selectedCert.expiryDate}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                الوصف التفصيلي
              </h4>
              <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-800 leading-relaxed">{selectedCert.description}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Enhanced Footer */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-t border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>تم التحقق من صحة البيانات</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="bg-white text-slate-700 font-semibold py-3 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 flex items-center gap-2"
              >
                <X size={16} />
                <span>إغلاق</span>
              </button>
              
              <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:from-emerald-700 hover:to-emerald-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
                <Download size={16} />
                <span>تحميل PDF</span>
              </button>

              <button 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2" 
                onClick={handleStartChat}
              >
                <MessageCircle size={16} />
                <span>بدء محادثة</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}
