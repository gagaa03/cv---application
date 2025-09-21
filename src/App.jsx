import { useState, useRef, useEffect } from 'react'
import GeneralInfo from './components/GeneralInfo';
import Profile from "./components/Profile";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import html2pdf from "html2pdf.js";

import Icon from '@mdi/react';
import { mdiRestart, mdiPrinter, mdiDownload, mdiEye, mdiFileEdit, mdiPhone, mdiEmail, mdiWeb, mdiGithub, mdiMapMarker } from '@mdi/js';

import './css/index.css'

function App() {

  // 集中管理整份 CV
  const [cvData, setCvData] = useState({
    firstName: "Gagaa",
    lastName: "Chu",
    middleInitial: "C.",
    jobTitle: "Web Developer",
    phone: "+886 123 456 789",
    email: "gagaa@gmail.com",
    github: "github.com/gagaa03",
    website: "gagaa.com",
    location: "Taipei, Taiwan",
    profile: "On the way of learning Web develope...",
    experience: [
      { company: "TSMC", startDate: "2022-10-15", endDate: "2023-10-15", position: "Human Resource assistant", description: "recruitment, compensation..." }
    ],
    education: [
      { school: "The Odin Project", startDate: "2025-02-01", endDate: "", degree: "Student", major: "Full Stack WebDesigner", description: "keep learning..." }
    ],
    skills: ["HTML", "CSS", "JavaScript", "React"],
    photo: ""
  });

  const [previewVisible, setPreviewVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const a4Ref = useRef();

   // 響應式切換
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1000;
      setIsMobile(mobile);
      setPreviewVisible(!mobile); // 大螢幕顯示預覽，小螢幕預設隱藏
    };

    handleResize(); // 初始執行一次
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clearCV = () => {
    setCvData({
      firstName: "",
      lastName: "",
      middleInitial: "",
      jobTitle: "",
      phone: "",
      email: "",
      github: "",
      website: "",
      location: "",
      profile: "",
      experience: [],
      education: [],
      skills: [],
      photo: ""
    });
  };

  // print
  const printCV = () => {
    window.print();
  };

  // PDF
  const downloadPDF = async () => {
    if (a4Ref.current) {
      // 暫時為 resume 元素添加一個 PDF 專用 class
      a4Ref.current.classList.add('is-pdf-exporting');

      const options = {
        margin: [0, 0, 0, 0],
        filename: `${cvData.firstName || "CV"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };

      try {
        await html2pdf().set(options).from(a4Ref.current).save();
      } catch (error) {
        console.error("PDF generation failed:", error);
      } finally {
        // 移除 class
        a4Ref.current.classList.remove('is-pdf-exporting');
      }
    }
  };

  // 上傳照片
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvData({ ...cvData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePreview = () => setPreviewVisible(!previewVisible);

  const formatDate = (date) => {
    if (!date) return "Present";
    const d = new Date(date);
    return d.toLocaleString('en-US', {month: 'short', year: 'numeric' });
  }


  return (
      <>
         <div className={`editor ${(!isMobile || !previewVisible) ? "show" : "hide"}`}>
          <header className='app-header'>
            <h1>Make Your CV</h1>
            <p>fast and effortless</p>
          </header>
          <div className='uploadImage'>
            <label>
              <span>Upload Photo：  </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          </div>
          
          <GeneralInfo  data={cvData} setData={setCvData}  />
          <Profile  data={cvData} setData={setCvData}  />
          <Experience  data={cvData} setData={setCvData}  />
          <Education  data={cvData} setData={setCvData}  />
          <Skills  data={cvData} setData={setCvData}  />
          <p className='footer'>© 2025 - Designed and developed by Gagaa Chu</p>
        </div>

        {/* 預覽區 */}
        <div className={`preview ${previewVisible ? "show" : "hide"}`}>
          <div className='resume' ref={a4Ref}>
        
            <div className='resume-header'>
              <div className='selfimage'>
                {cvData.photo && <img src={cvData.photo} alt="Profile" />}
              </div>
              <div className='name-job'>
                <h1 className='full-Name'>{cvData.firstName} {cvData.middleInitial} {cvData.lastName}</h1>
                <h2 className='job'>{cvData.jobTitle}</h2>
              </div>              
            </div>
            
            <div className='resume-body'>
              <div className='sideBar'>
                <section className='contact'>
                  <h3>CONTACT</h3>
                  <div className='contact-list'>
                    <p><Icon path={mdiPhone} size={0.5} />  {cvData.phone}</p>
                    <p><Icon path={mdiEmail} size={0.5} />{cvData.email}</p>
                    <p><Icon path={mdiWeb} size={0.5} />{cvData.website}</p>
                    <p><Icon path={mdiGithub} size={0.5} />{cvData.github}</p>
                    <p><Icon path={mdiMapMarker} size={0.5} />{cvData.location}</p>
                  </div>
                  
                </section>

                <section className='resume-skills'>
                  <h3>SKILLS</h3>
                  <p>{cvData.skills.join(", ")}</p>
                </section>
              </div>


              <div className='main-content'>
                <section className='resume-profile'>
                  <h3 className='resume-heading'>PROFILE</h3>
                  <p>{cvData.profile}</p>
                </section>

                <section className='resume-experience'>
                  <h3 className='resume-heading'>WORK EXPERIENCE</h3>
                  {cvData.experience.map((exp, i) => (
                    <div key={i} className='experience-item'>
                      <div className='company'>
                        <strong>{exp.company}</strong>
                      </div>
                      <div className='date'>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}  
                      </div>                                       
                      <div className='position'>{exp.position}</div>
                      <div className='description'>{exp.description}</div>
                    </div>
                  ))}
                </section>

                <section className='resume-education'>
                  <h3 className='resume-heading'>EDUCATION</h3>
                  {cvData.education.map((edu, i) => (
                    <div key={i} className='education-item'>
                      <div className='school'>
                        <strong>{edu.school}</strong>
                        <div className='degree'>{edu.degree}</div>
                      </div>
                      <div className='date'>
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate) || "Present"}
                      </div>
                      <div className='major'>{edu.major}</div>
                      <div className='description'>{edu.description}</div>
                    </div>
                  ))}
                </section>
              </div>
            </div>            
          </div>
          < div className='preview-size'>A4 preview</div>
        </div>
            
        

        {/* 工具列 */}
        <div className="cv-tools">
          {isMobile && (
            <button className="toggle-preview" onClick={togglePreview}>
              {previewVisible ? <Icon path={mdiFileEdit} size={1} /> : <Icon path={mdiEye} size={1} />}
            </button>
          )}
          <button onClick={clearCV}><Icon path={mdiRestart} size={1} /></button>
          <button onClick={printCV}><Icon path={mdiPrinter} size={1} /></button>
          <button onClick={downloadPDF}><Icon path={mdiDownload} size={1} /></button>
        </div>
      </>
  )
}

export default App;
