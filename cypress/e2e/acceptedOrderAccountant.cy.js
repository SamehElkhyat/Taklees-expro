describe('AcceptedOrderAccountant Page', () => {
  beforeEach(() => {
    // Intercept API calls to control test data
    cy.intercept('GET', '**/Profile', {
      statusCode: 200,
      body: { role: 'Accountant', id: 1 }
    }).as('getProfile');
    
    cy.intercept('GET', '**/Get-All-Done-Accept-Orders/1', {
      statusCode: 200,  
      body: {
        data: [
          {
            id: 1,
            location: 'الرياض',
            fullName: 'أحمد محمد',
            typeOrder: 'استيراد',
            email: 'ahmed@test.com',
            value: '5000',
            date: '2024-01-15',
            brokerID: 123,
            customerServiceName: 'خدمة العملاء',
            customerServiceEmail: 'service@test.com'
          },
          {
            id: 2,
            location: 'جدة',
            fullName: 'فاطمة عبدالله',
            typeOrder: 'تصدير',
            email: 'fatima@test.com',
            value: '3000',
            date: '2024-01-16',
            brokerID: 124,
            customerServiceName: 'خدمة العملاء',
            customerServiceEmail: 'service@test.com'
          }
        ],
        totalPages: 1,
        totalOrders: 2
      }
    }).as('getAllOrders');

    // Visit the page
    cy.visit('http://localhost:3000/AcceptedOrderAccountant');
    
    // Wait for API calls to complete
    cy.wait(['@getProfile', '@getAllOrders']);
    
    // Wait for page header to be visible
    cy.contains('قائمه الحوالات للمخلصين').should('be.visible');
  });

  describe('Page Layout and Initial Rendering', () => {
    it('should display page header correctly', () => {
      cy.contains('قائمه الحوالات للمخلصين').should('be.visible');
    });

    it('should display orders count information', () => {
      cy.contains('إجمالي الطلبات:').should('be.visible');
      cy.contains('2').should('be.visible'); // Based on mocked data
    });

    it('should display search bar with correct placeholder', () => {
      cy.get('input[placeholder="ابحث عن طلب (رقم الطلب)"]').should('be.visible');
    });

    it('should display table with correct headers', () => {
      cy.get('table').should('be.visible');
      cy.contains('th', 'رقم الطلب').should('be.visible');
      cy.contains('th', 'موقع الطلب').should('be.visible');
      cy.contains('th', 'الاسم').should('be.visible');
      cy.contains('th', 'نوع الطلب').should('be.visible');
      cy.contains('th', 'البريد الالكتروني').should('be.visible');
      cy.contains('th', 'المبلغ').should('be.visible');
      cy.contains('th', 'التاريخ').should('be.visible');
      cy.contains('th', 'تفاصيل المخلص').should('be.visible');
      cy.contains('th', 'الحالة').should('be.visible');
      cy.contains('th', 'الملفات').should('be.visible');
    });

    it('should display table data correctly', () => {
      // Check first row data
      cy.get('table tbody tr').first().within(() => {
        cy.contains('1').should('be.visible'); // Order ID
        cy.contains('الرياض').should('be.visible'); // Location
        cy.contains('أحمد محمد').should('be.visible'); // Full Name
        cy.contains('استيراد').should('be.visible'); // Order Type
        cy.contains('ahmed@test.com').should('be.visible'); // Email
        cy.contains('5000').should('be.visible'); // Value
        cy.contains('2024-01-15').should('be.visible'); // Date
      });
    });
  });

  describe('Search Functionality', () => {
    it('should filter orders by order ID', () => {
      cy.get('input[placeholder="ابحث عن طلب (رقم الطلب)"]').type('1');
      
      // Should show only orders containing "1"
      cy.get('table tbody tr').should('have.length', 1);
      cy.get('table tbody tr').first().should('contain', '1');
    });

    it('should show no results message when search returns empty', () => {
      cy.get('input[placeholder="ابحث عن طلب (رقم الطلب)"]').type('999');
      
      cy.get('table tbody tr').should('have.length', 1);
      cy.contains('لا توجد نتائج للبحث').should('be.visible');
    });

    it('should clear search and show all results', () => {
      cy.get('input[placeholder="ابحث عن طلب (رقم الطلب)"]').type('1');
      cy.get('table tbody tr').should('have.length', 1);
      
      cy.get('input[placeholder="ابحث عن طلب (رقم الطلب)"]').clear();
      cy.get('table tbody tr').should('have.length', 2);
    });
  });

  describe('Order Details Modal', () => {
    it('should open order details modal when clicking عرض التفاصيل', () => {
      // Mock broker details API
      cy.intercept('GET', '**/broker/*', {
        statusCode: 200,
        body: {
          email: 'broker@test.com',
          fullName: 'مخلص تجريبي',
          identity: '1234567890',
          phoneNumber: '0501234567',
          license: 'LIC123',
          taxRecord: 'TAX123'
        }
      }).as('getBrokerDetails');

      cy.get('button').contains('عرض التفاصيل').first().click();
      
      cy.wait('@getBrokerDetails');
      
      // Check modal is visible
      cy.get('.modal').should('be.visible');
      cy.contains('تفاصيل الطلب').should('be.visible');
      
      // Check modal content
      cy.contains('البريد الإكتروني').should('be.visible');
      cy.contains('الاسم').should('be.visible');
      cy.contains('رقم الهويه').should('be.visible');
      cy.contains('رقم الهاتف').should('be.visible');
      cy.contains('رخصه المخلص').should('be.visible');
      cy.contains('الرقم الضريبي').should('be.visible');
    });

    it('should close order details modal when clicking إغلاق', () => {
      cy.intercept('GET', '**/broker/*', {
        statusCode: 200,
        body: { email: 'broker@test.com', fullName: 'مخلص تجريبي' }
      }).as('getBrokerDetails');

      cy.get('button').contains('عرض التفاصيل').first().click();
      cy.wait('@getBrokerDetails');
      
      cy.get('.modal').should('be.visible');
      cy.get('button').contains('إغلاق').click();
      cy.get('.modal').should('not.exist');
    });
  });

  describe('Order Status Actions', () => {
    it('should show note field when clicking لم يتم التحويل', () => {
      cy.get('button').contains('لم يتم التحويل').first().click();
      
      // Check note field appears
      cy.get('input[placeholder*="اكتب ملاحظة"]').should('be.visible');
      cy.get('button').contains('إرسال الملاحظة').should('be.visible');
    });

    it('should send note when clicking إرسال الملاحظة', () => {
      // Mock the API call
      cy.intercept('POST', '**/Change-Statu-Account', {
        statusCode: 200,
        body: { success: true }
      }).as('changeStatusNot');

      cy.get('button').contains('لم يتم التحويل').first().click();
      
      // Add note text
      cy.get('input[placeholder*="اكتب ملاحظة"]').type('ملاحظة تجريبية');
      
      // Click send note
      cy.get('button').contains('إرسال الملاحظة').click();
      
      cy.wait('@changeStatusNot');
      
      // Check API was called with correct data
      cy.get('@changeStatusNot').should((interception) => {
        expect(interception.request.body).to.deep.include({
          statuOrder: 'false',
          ID: 1,
          Notes: 'ملاحظة تجريبية'
        });
      });
    });

    it('should mark order as transferred when clicking تم التحويل', () => {
      // Mock the API call
      cy.intercept('POST', '**/Change-Statu-Account', {
        statusCode: 200,
        body: { success: true }
      }).as('changeStatusDone');

      cy.get('button').contains('تم التحويل').first().click();
      
      cy.wait('@changeStatusDone');
      
      // Check API was called with correct data
      cy.get('@changeStatusDone').should((interception) => {
        expect(interception.request.body).to.deep.include({
          statuOrder: 'true',
          ID: 1
        });
      });
    });
  });

  describe('Files and Notes Modal', () => {
    it('should open files modal when clicking عرض تفاصيل الملاحظات', () => {
      // Mock the file details API
      cy.intercept('POST', '**/Get-Name-File-From-CustomerService', {
        statusCode: 200,
        body: {
          notes: 'ملاحظات الطلب',
          fileName: 'document.pdf',
          fileUrl: 'https://example.com/file.pdf'
        }
      }).as('getFileName');

      cy.get('button').contains('عرض تفاصيل الملاحظات').first().click();
      
      cy.wait('@getFileName');
      
      // Check modal is visible
      cy.get('.modal').should('be.visible');
      cy.contains('تفاصيل الطلب').should('be.visible');
      
      // Check modal content
      cy.contains('الملاحظات').should('be.visible');
      cy.contains('تحميل الملف').should('be.visible');
      cy.get('button').contains('عرض الملف').should('be.visible');
    });

    it('should close files modal when clicking إغلاق', () => {
      cy.intercept('POST', '**/Get-Name-File-From-CustomerService', {
        statusCode: 200,
        body: { notes: 'test', fileName: 'test.pdf', fileUrl: 'test.com' }
      }).as('getFileName');

      cy.get('button').contains('عرض تفاصيل الملاحظات').first().click();
      cy.wait('@getFileName');
      
      cy.get('.modal').should('be.visible');
      cy.get('button').contains('إغلاق').click();
      cy.get('.modal').should('not.exist');
    });

    it('should open file in new tab when clicking عرض الملف', () => {
      cy.intercept('POST', '**/Get-Name-File-From-CustomerService', {
        statusCode: 200,
        body: {
          notes: 'test',
          fileName: 'test.pdf',
          fileUrl: 'https://example.com/test.pdf'
        }
      }).as('getFileName');

      // Mock window.open
      cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen');
      });

      cy.get('button').contains('عرض تفاصيل الملاحظات').first().click();
      cy.wait('@getFileName');
      
      cy.get('button').contains('عرض الملف').click();
      
      cy.get('@windowOpen').should('have.been.calledWith', 'https://example.com/test.pdf', '_blank');
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      // Mock multi-page data
      cy.intercept('GET', '**/Get-All-Done-Accept-Orders/*', {
        statusCode: 200,
        body: {
          data: [
            { id: 1, location: 'الرياض', fullName: 'أحمد محمد', typeOrder: 'استيراد', email: 'ahmed@test.com', value: '5000', date: '2024-01-15', brokerID: 123 }
          ],
          totalPages: 3,
          totalOrders: 15
        }
      }).as('getOrdersWithPagination');
    });

    it('should display pagination component when there are multiple pages', () => {
      cy.visit('/accountant/accepted-orders');
      cy.wait('@getOrdersWithPagination');
      
      cy.get('[data-testid="pagination"]').should('be.visible');
    });
  });

  describe('Loading States', () => {
    it('should show loading state while fetching data', () => {
      // Intercept with delay
      cy.intercept('GET', '**/Get-All-Done-Accept-Orders/*', {
        statusCode: 200,
        body: { data: [], totalPages: 1, totalOrders: 0 },
        delay: 1000
      }).as('getOrdersSlowly');

      cy.visit('/accountant/accepted-orders');
      
      // Check loading state
      cy.contains('جاري التحميل...').should('be.visible');
      
      cy.wait('@getOrdersSlowly');
      
      // Loading should disappear
      cy.contains('جاري التحميل...').should('not.exist');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', () => {
      cy.intercept('GET', '**/Get-All-Done-Accept-Orders/*', {
        statusCode: 500,
        body: { error: 'Server Error' }
      }).as('getOrdersError');

      cy.visit('/accountant/accepted-orders');
      cy.wait('@getOrdersError');
      
      // Should not crash and show appropriate message
      cy.contains('لا توجد طلبات مقبولة').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('should be responsive on mobile devices', () => {
      cy.viewport('iphone-6');
      
      // Check table is scrollable horizontally
      cy.get('.overflow-x-auto').should('be.visible');
      
      // Check buttons are stacked vertically on mobile
      cy.get('.flex-col').should('exist');
    });

    it('should be responsive on tablet devices', () => {
      cy.viewport('ipad-2');
      
      // Check layout adapts to tablet size
      cy.get('table').should('be.visible');
      cy.get('.container').should('be.visible');
    });
  });
});
  