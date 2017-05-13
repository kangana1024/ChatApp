# ChatApp

<h2>วิธีการติดตั้ง</h2>

หลังจากแตกไฟล์หรือ git clone ให้เปิด command หรือ terminal จากนั้น cd เข้าไปใน folder ของ project นี้จากนั้นพิมพ์คำสั่ง <br/>
<code>
npm install
</code><br/>

<h2>Android</h2>
เปิด packager เพื่อเปิด server<br/>
<code>
react-native start
</code><br/>
แล้วเปิด command หรือ terminal ขึ้นมาใหม่อีก 1 อัน cd เข้าไปใน folder ของ project จากนั้นพิมพ์คำสั่ง<br/>
<code>
react-native run-android
</code><br/>
ถ้า run ไม่ได้ให้เปิด android studio ในการ run โดยเปิดจาก folder android ใน project นี้

<h2>IOS</h2>
<code>
react-native run-ios
</code>

<h2>เงื่อนไขการติดตั้ง</h2>
- ทำการเปลี่ยน <code>firebase.initializeApp(...</code> ในไฟล์ src/components/Backend.js ให้เป็น Api ของตัวเอง
- ไปเปิด การ login แบบ Anonymously ใน firebase console โดยคลิกเมนู Authentication > ไปที่ tab วิธีการลงชื่อใช้งาน > จากนั้นไปเปิด ไม่ระบุตัวตน
