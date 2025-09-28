# بوابة المدينة الجامعية (Starter)

## الاستخدام السريع
1) ارفع هذا المجلد كريبو على GitHub.
2) من Settings → Pages: 
   - Source: Deploy from a branch → Branch: main / (root) → Save.
3) من Settings → Actions → General: فعّل **Workflow permissions = Read and write**.
4) افتح تبويب **Issues** واختر قالب:
   - **Add Restaurant** لإضافة مطعم.
   - **Add News** لإضافة خبر.
سيعمل GitHub Action تلقائيًا ويضيف/يحدث ملفات `content/...`، والصفحات ستقرأها مباشرة بدون Build.

## الدومين المخصص
- ضع الدومين في Settings → Pages → Custom domain، أو أنشئ ملف `CNAME` في الجذر يحتوي على سطر واحد باسم الدومين.
- عدّل DNS:
  - CNAME لـ `www` يشير إلى `USERNAME.github.io.`
  - A records للدومين الجذر (اختياري): 185.199.108.153/109.153/110.153/111.153
- فعّل Enforce HTTPS بعد ما يشتغل الدومين.

## تعديل الواجهة
- الستايل في `assets/style.css`.
- من أجل البحث/الفلترة تم إضافة مربع بحث في صفحة المطاعم.
- يمكن إضافة أقسام جديدة بتكرار نفس النمط (مجلد داخل `content/` + Issue Template + تحديث بسيط في الواجهة).

## ملاحظات
- المسارات في الجافاسكربت **نسبية** (بدون `/` في البداية) لتعمل على project pages.
- لو الفرع محمي، بدّل خطوة الـpush إلى Pull Request في ملف workflow.
