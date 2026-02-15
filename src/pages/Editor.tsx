import { useState } from 'react';
import { FiArrowLeft, FiDownload, FiTrash2, FiZap, FiX, FiSend, FiCheck } from 'react-icons/fi';
import { useResumeStore } from '../store/resumeStore';
import BasicInfoEditor from '../components/editors/BasicInfoEditor';
import EducationEditor from '../components/editors/EducationEditor';
import WorkExperienceEditor from '../components/editors/WorkExperienceEditor';
import ProjectExperienceEditor from '../components/editors/ProjectExperienceEditor';
import SkillsEditor from '../components/editors/SkillsEditor';
import SelfEvaluationEditor from '../components/editors/SelfEvaluationEditor';
import ResumePreview from '../components/preview/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import { exportToPDF } from '../utils/pdfExport';
import { parseResumeWithAI, ParsedResume } from '../utils/api';

type ModuleKey = 'basicInfo' | 'education' | 'workExperience' | 'projectExperience' | 'skills' | 'selfEvaluation';

interface ModuleConfig {
  key: ModuleKey;
  title: string;
  required: boolean;
  component: React.ReactNode;
}

export default function Editor() {
  const [activeModule, setActiveModule] = useState<ModuleKey>('basicInfo');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAIFill, setShowAIFill] = useState(false);
  const [aiText, setAiText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiParsedData, setAiParsedData] = useState<ParsedResume | null>(null);
  const [aiError, setAiError] = useState('');
  const { resumeData, resetResume, template, updateBasicInfo, addEducation, addWorkExperience, addProjectExperience, addSkill, updateSelfEvaluation } = useResumeStore();

  const modules: ModuleConfig[] = [
    { key: 'basicInfo', title: '基本信息', required: true, component: <BasicInfoEditor /> },
    { key: 'education', title: '教育背景', required: false, component: <EducationEditor /> },
    { key: 'workExperience', title: '工作/实习经历', required: false, component: <WorkExperienceEditor /> },
    { key: 'projectExperience', title: '项目经验', required: false, component: <ProjectExperienceEditor /> },
    { key: 'skills', title: '专业技能', required: false, component: <SkillsEditor /> },
    { key: 'selfEvaluation', title: '自我评价', required: false, component: <SelfEvaluationEditor /> },
  ];

  const handleExport = () => {
    exportToPDF('resume-preview', `${resumeData.basicInfo.name || '简历'}-${resumeData.basicInfo.jobIntent || '个人简历'}.pdf`);
  };

  const handleReset = () => {
    if (confirm('确定要清空所有内容吗？此操作不可恢复。')) {
      resetResume();
    }
  };

  const goHome = () => {
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={goHome}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>返回首页</span>
          </button>
          <div className="h-6 w-px bg-slate-300" />
          <h1 className="text-xl font-semibold text-slate-800">简历编辑器</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTemplates(true)}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            更换模板
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            导出PDF
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={() => setShowAIFill(true)}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25"
            >
              <FiZap className="w-5 h-5" />
              <span className="font-medium">AI智能填充</span>
            </button>
            <p className="text-xs text-slate-500 text-center mt-2">粘贴经历，AI自动识别填充</p>
          </div>
          <nav className="p-4">
            <h2 className="text-sm font-medium text-slate-500 mb-3">简历模块</h2>
            <ul className="space-y-2">
              {modules.map((module) => (
                <li key={module.key}>
                  <button
                    onClick={() => setActiveModule(module.key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                      activeModule === module.key
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{module.title}</span>
                    {module.required && (
                      <span className="text-xs text-red-500">必填</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FiTrash2 className="w-4 h-4" />
              清空内容
            </button>
          </div>
        </aside>

        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-800">
                  {modules.find((m) => m.key === activeModule)?.title}
                </h2>
              </div>
              {modules.find((m) => m.key === activeModule)?.component}
            </div>
          </div>

          <div className="w-[210mm] bg-slate-200 overflow-y-auto p-8">
            <div className="bg-white shadow-lg" style={{ minHeight: '297mm' }}>
              <div id="resume-preview">
                <ResumePreview template={template} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {showTemplates && (
        <TemplateSelector onClose={() => setShowTemplates(false)} />
      )}

      {showAIFill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[700px] max-h-[90vh] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <div className="flex items-center gap-2">
                <FiZap className="w-5 h-5" />
                <h2 className="text-xl font-semibold">AI智能填充</h2>
              </div>
              <button onClick={() => { setShowAIFill(false); setAiParsedData(null); setAiText(''); }} className="text-white/80 hover:text-white">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {!aiParsedData ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      粘贴您的个人经历描述
                    </label>
                    <textarea
                      value={aiText}
                      onChange={(e) => setAiText(e.target.value)}
                      placeholder="例如：我叫张三，2020年毕业于北京大学软件工程专业，在腾讯公司担任前端开发工程师3年，负责微信小程序开发，使用Vue和React技术栈..."
                      rows={12}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      提示：粘贴越详细的信息，AI识别越准确。建议包含教育背景、工作经历、项目经验、技能等
                    </p>
                  </div>

                  {aiError && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      {aiError}
                    </div>
                  )}

                  <button
                    onClick={async () => {
                      if (!aiText.trim()) return;
                      setAiLoading(true);
                      setAiError('');
                      try {
                        const data = await parseResumeWithAI(aiText);
                        setAiParsedData(data);
                      } catch (err) {
                        setAiError('解析失败，请重试或检查网络连接');
                      } finally {
                        setAiLoading(false);
                      }
                    }}
                    disabled={aiLoading || !aiText.trim()}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {aiLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        AI识别中...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4" />
                        开始识别
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-purple-700">识别结果预览</span>
                      <button
                        onClick={() => { setAiParsedData(null); setAiText(''); }}
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        重新识别
                      </button>
                    </div>
                    
                    <div className="space-y-3 text-sm max-h-[400px] overflow-y-auto">
                      {aiParsedData.basicInfo && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">基本信息</div>
                          <div className="text-slate-600 text-xs space-y-1">
                            {aiParsedData.basicInfo.name && <div>姓名: {aiParsedData.basicInfo.name}</div>}
                            {aiParsedData.basicInfo.phone && <div>电话: {aiParsedData.basicInfo.phone}</div>}
                            {aiParsedData.basicInfo.email && <div>邮箱: {aiParsedData.basicInfo.email}</div>}
                            {aiParsedData.basicInfo.jobIntent && <div>求职意向: {aiParsedData.basicInfo.jobIntent}</div>}
                          </div>
                        </div>
                      )}
                      
                      {aiParsedData.education && aiParsedData.education.length > 0 && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">教育背景 ({aiParsedData.education.length}条)</div>
                          {aiParsedData.education.map((edu, i) => (
                            <div key={i} className="text-slate-600 text-xs">
                              {edu.school} - {edu.major} ({edu.timeRange})
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {aiParsedData.workExperience && aiParsedData.workExperience.length > 0 && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">工作经历 ({aiParsedData.workExperience.length}条)</div>
                          {aiParsedData.workExperience.map((work, i) => (
                            <div key={i} className="text-slate-600 text-xs">
                              {work.company} - {work.position} ({work.timeRange})
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {aiParsedData.projectExperience && aiParsedData.projectExperience.length > 0 && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">项目经验 ({aiParsedData.projectExperience.length}条)</div>
                          {aiParsedData.projectExperience.map((proj, i) => (
                            <div key={i} className="text-slate-600 text-xs">
                              {proj.name} - {proj.role} ({proj.timeRange})
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {aiParsedData.skills && aiParsedData.skills.length > 0 && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">专业技能</div>
                          <div className="text-slate-600 text-xs">
                            {aiParsedData.skills.map(s => s.name).join('、')}
                          </div>
                        </div>
                      )}
                      
                      {aiParsedData.selfEvaluation && (
                        <div className="bg-white p-3 rounded border border-slate-200">
                          <div className="font-medium text-slate-700 mb-1">自我评价</div>
                          <div className="text-slate-600 text-xs">{aiParsedData.selfEvaluation.substring(0, 100)}...</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => { setAiParsedData(null); setAiText(''); setShowAIFill(false); }}
                      className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                    >
                      取消
                    </button>
                    <button
                      onClick={async () => {
                        if (!aiParsedData) return;
                        resetResume();
                        await new Promise(resolve => setTimeout(resolve, 100));
                        
                        if (aiParsedData.basicInfo) {
                          const { basicInfo } = aiParsedData;
                          if (basicInfo.name) updateBasicInfo('name', basicInfo.name);
                          if (basicInfo.phone) updateBasicInfo('phone', basicInfo.phone);
                          if (basicInfo.email) updateBasicInfo('email', basicInfo.email);
                          if (basicInfo.jobIntent) updateBasicInfo('jobIntent', basicInfo.jobIntent);
                          if (basicInfo.personalWebsite) updateBasicInfo('personalWebsite', basicInfo.personalWebsite);
                        }
                        if (aiParsedData.education) {
                          for (const edu of aiParsedData.education) {
                            addEducation();
                            await new Promise(resolve => setTimeout(resolve, 50));
                            const store = useResumeStore.getState();
                            const lastId = store.resumeData.education[store.resumeData.education.length - 1]?.id;
                            if (lastId) {
                              if (edu.timeRange) store.updateEducation(lastId, 'timeRange', edu.timeRange);
                              if (edu.school) store.updateEducation(lastId, 'school', edu.school);
                              if (edu.major) store.updateEducation(lastId, 'major', edu.major);
                              if (edu.degree) store.updateEducation(lastId, 'degree', edu.degree);
                              if (edu.description) store.updateEducation(lastId, 'description', edu.description);
                            }
                          }
                        }
                        if (aiParsedData.workExperience) {
                          for (const work of aiParsedData.workExperience) {
                            addWorkExperience();
                            await new Promise(resolve => setTimeout(resolve, 50));
                            const store = useResumeStore.getState();
                            const lastId = store.resumeData.workExperience[store.resumeData.workExperience.length - 1]?.id;
                            if (lastId) {
                              if (work.timeRange) store.updateWorkExperience(lastId, 'timeRange', work.timeRange);
                              if (work.company) store.updateWorkExperience(lastId, 'company', work.company);
                              if (work.position) store.updateWorkExperience(lastId, 'position', work.position);
                              if (work.description) store.updateWorkExperience(lastId, 'description', work.description);
                            }
                          }
                        }
                        if (aiParsedData.projectExperience) {
                          for (const proj of aiParsedData.projectExperience) {
                            addProjectExperience();
                            await new Promise(resolve => setTimeout(resolve, 50));
                            const store = useResumeStore.getState();
                            const lastId = store.resumeData.projectExperience[store.resumeData.projectExperience.length - 1]?.id;
                            if (lastId) {
                              if (proj.timeRange) store.updateProjectExperience(lastId, 'timeRange', proj.timeRange);
                              if (proj.name) store.updateProjectExperience(lastId, 'name', proj.name);
                              if (proj.role) store.updateProjectExperience(lastId, 'role', proj.role);
                              if (proj.description) store.updateProjectExperience(lastId, 'description', proj.description);
                            }
                          }
                        }
                        if (aiParsedData.skills) {
                          for (const skill of aiParsedData.skills) {
                            if (skill.name) {
                              addSkill();
                              await new Promise(resolve => setTimeout(resolve, 50));
                              const store = useResumeStore.getState();
                              const lastId = store.resumeData.skills[store.resumeData.skills.length - 1]?.id;
                              if (lastId) {
                                store.updateSkill(lastId, 'name', skill.name);
                              }
                            }
                          }
                        }
                        if (aiParsedData.selfEvaluation) {
                          updateSelfEvaluation(aiParsedData.selfEvaluation);
                        }
                        setAiParsedData(null);
                        setAiText('');
                        setShowAIFill(false);
                      }}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 flex items-center justify-center gap-2"
                    >
                      <FiCheck className="w-4 h-4" />
                      确认填充全部
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
