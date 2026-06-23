# TASK 3 - E-commerce Admin Panel

Dashboard تفاعلي لإدارة متجر إلكتروني باستخدام React.

## المطلوب المنفذ

- Dashboard رئيسية تعرض:
  - عدد الطلبات
  - عدد المستخدمين
  - الأرباح
  - Charts باستخدام Chart.js
- Products Page:
  - عرض المنتجات على شكل Cards
  - صورة، اسم، سعر، حالة المنتج
  - Search
  - Filter حسب السعر والحالة
  - Pagination
- Add Product:
  - Form لاسم المنتج، السعر، الوصف، الصورة
  - Validation
  - السعر رقم فقط
  - الاسم مطلوب
  - رسالة نجاح وخطأ
- Edit Product
- Delete Product مع Confirmation Modal
- Users Page:
  - عرض المستخدمين
  - Role: Admin / User
  - تغيير الدور
- React Router
- State Management باستخدام useState + Context
- Mock API باستخدام JSON Server
- Responsive UI
- Sidebar + Navbar
- Loading Spinner
- Empty States
- Bonus:
  - Dark Mode
  - Drag & Drop للصور
  - Login Page
  - Lazy Loading لتحسين الأداء

## طريقة التشغيل

افتح المشروع داخل VS Code ثم شغّل الأوامر التالية:

```bash
npm install
npm run start
```

سيعمل المشروع على:

```bash
http://localhost:5173
```

وسيعمل Mock API على:

```bash
http://localhost:4000
```

## بيانات تسجيل الدخول

```bash
Email: admin@example.com
Password: admin123
```

## ملاحظات مهمة

- ملف البيانات موجود في `db.json`.
- الصور عند الإضافة يتم تحويلها إلى Base64 وحفظها في Mock API.
- يجب تشغيل `npm run start` حتى يعمل React و JSON Server معاً.
