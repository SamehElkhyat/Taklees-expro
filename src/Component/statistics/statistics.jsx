import React from 'react'

export default function statistics() {
  
  
  return<>
    <div className="container py-5">
      <h2 className="text-center mb-4" style={{color: '#006666'}}>إحصائيات النظام</h2>
      
      <div className="row g-4">
        {/* Total Clients Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 text-primary mb-2">
                <i className="fas fa-users"></i>
              </div>
              <h5 className="card-title">إجمالي العملاء</h5>
              <h3 className="text-primary">1,234</h3>
              <p className="text-muted small">زيادة 12% عن الشهر السابق</p>
            </div>
          </div>
        </div>

        {/* Active Orders Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 text-success mb-2">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h5 className="card-title">الطلبات النشطة</h5>
              <h3 className="text-success">156</h3>
              <p className="text-muted small">في طور المعالجة</p>
            </div>
          </div>
        </div>

        {/* Completed Orders Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 text-info mb-2">
                <i className="fas fa-check-circle"></i>
              </div>
              <h5 className="card-title">الطلبات المكتملة</h5>
              <h3 className="text-info">3,789</h3>
              <p className="text-muted small">هذا العام</p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-4 text-warning mb-2">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h5 className="card-title">الإيرادات</h5>
              <h3 className="text-warning">45,678</h3>
              <p className="text-muted small">ريال سعودي</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Statistics */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">توزيع الطلبات حسب الحالة</h5>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>قيد المعالجة</span>
                <div className="progress" style={{width: '70%', height: '10px'}}>
                  <div className="progress-bar bg-primary" style={{width: '80%'}}></div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span>في الانتظار</span>
                <div className="progress" style={{width: '70%', height: '10px'}}>
                  <div className="progress-bar bg-warning" style={{width: '45%'}}></div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>مكتملة</span>
                <div className="progress" style={{width: '70%', height: '10px'}}>
                  <div className="progress-bar bg-success" style={{width: '25%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title mb-4">أداء الوسطاء</h5>
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th>الوسيط</th>
                      <th>الطلبات المنجزة</th>
                      <th>التقييم</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>أحمد محمد</td>
                      <td>45</td>
                      <td>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star-half-alt text-warning"></i>
                      </td>
                    </tr>
                    <tr>
                      <td>سارة أحمد</td>
                      <td>38</td>
                      <td>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="fas fa-star text-warning"></i>
                        <i className="far fa-star text-warning"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  
  </>
}
