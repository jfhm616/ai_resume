import { ResumeData, TemplateType } from '../../types/resume';
import { useResumeStore } from '../../store/resumeStore';

interface ResumePreviewProps {
  template: TemplateType;
}

export default function ResumePreview({ template }: ResumePreviewProps) {
  const { resumeData } = useResumeStore();
  const { basicInfo, education, workExperience, projectExperience, skills, selfEvaluation } = resumeData;

  const templates = {
    simple: <SimpleTemplate basicInfo={basicInfo} education={education} workExperience={workExperience} projectExperience={projectExperience} skills={skills} selfEvaluation={selfEvaluation} />,
    campus: <CampusTemplate basicInfo={basicInfo} education={education} workExperience={workExperience} projectExperience={projectExperience} skills={skills} selfEvaluation={selfEvaluation} />,
    creative: <CreativeTemplate basicInfo={basicInfo} education={education} workExperience={workExperience} projectExperience={projectExperience} skills={skills} selfEvaluation={selfEvaluation} />,
  };

  return templates[template];
}

interface TemplateProps {
  basicInfo: ResumeData['basicInfo'];
  education: ResumeData['education'];
  workExperience: ResumeData['workExperience'];
  projectExperience: ResumeData['projectExperience'];
  skills: ResumeData['skills'];
  selfEvaluation: string;
}

function SimpleTemplate({ basicInfo, education, workExperience, projectExperience, skills, selfEvaluation }: TemplateProps) {
  return (
    <div className="p-8 text-sm">
      <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
        {basicInfo.avatar && (
          <img src={basicInfo.avatar} alt="头像" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
        )}
        <h1 className="text-2xl font-bold text-slate-900 mb-1">{basicInfo.name || '姓名'}</h1>
        <p className="text-lg text-slate-600 mb-2">{basicInfo.jobIntent || '求职意向'}</p>
        <div className="flex justify-center gap-4 text-slate-600">
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
          {basicInfo.email && <span>| {basicInfo.email}</span>}
        </div>
        {basicInfo.personalWebsite && (
          <p className="text-slate-600 mt-1">{basicInfo.personalWebsite}</p>
        )}
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">教育背景</h2>
          {education.map((item) => (
            <div key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.school}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-slate-600">{item.major} | {item.degree}</p>
              {item.description && <p className="text-slate-500 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">工作经历</h2>
          {workExperience.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-medium">{item.company}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-slate-600">{item.position}</p>
              {item.description && <p className="text-slate-600 mt-1 whitespace-pre-line">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {projectExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">项目经验</h2>
          {projectExperience.map((item) => (
            <div key={item.id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-slate-600">{item.role}</p>
              {item.description && <p className="text-slate-600 mt-1 whitespace-pre-line">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">专业技能</h2>
          <p className="text-slate-600">
            {skills.map((s) => s.name).join('、')}
          </p>
        </div>
      )}

      {selfEvaluation && (
        <div>
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">自我评价</h2>
          <p className="text-slate-600 whitespace-pre-line">{selfEvaluation}</p>
        </div>
      )}
    </div>
  );
}

function CampusTemplate({ basicInfo, education, workExperience, projectExperience, skills, selfEvaluation }: TemplateProps) {
  return (
    <div className="p-8 text-sm">
      <div className="bg-blue-600 -mx-8 -mt-8 px-8 pt-8 pb-6 mb-6 text-white">
        <div className="flex items-center gap-4">
          {basicInfo.avatar && (
            <img src={basicInfo.avatar} alt="头像" className="w-16 h-16 rounded-full object-cover border-2 border-white" />
          )}
          <div>
            <h1 className="text-2xl font-bold">{basicInfo.name || '姓名'}</h1>
            <p className="text-blue-100">{basicInfo.jobIntent || '求职意向'}</p>
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-blue-100 text-sm">
          {basicInfo.phone && <span>{basicInfo.phone}</span>}
          {basicInfo.email && <span>| {basicInfo.email}</span>}
          {basicInfo.personalWebsite && <span>| {basicInfo.personalWebsite}</span>}
        </div>
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-blue-600 mb-2">▎教育背景</h2>
          {education.map((item) => (
            <div key={item.id} className="mb-2 pl-4">
              <div className="flex justify-between">
                <span className="font-medium">{item.school}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-slate-600">{item.major} | {item.degree}</p>
            </div>
          ))}
        </div>
      )}

      {(workExperience.length > 0 || projectExperience.length > 0) && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-blue-600 mb-2">▎实践经历</h2>
          {workExperience.map((item) => (
            <div key={item.id} className="mb-3 pl-4">
              <div className="flex justify-between">
                <span className="font-medium">{item.company}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-blue-600">{item.position}</p>
              {item.description && <p className="text-slate-600 mt-1">{item.description}</p>}
            </div>
          ))}
          {projectExperience.map((item) => (
            <div key={item.id} className="mb-3 pl-4">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-blue-600">{item.role}</p>
              {item.description && <p className="text-slate-600 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-blue-600 mb-2">▎专业技能</h2>
          <div className="flex flex-wrap gap-2 pl-4">
            {skills.map((s) => (
              <span key={s.id} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selfEvaluation && (
        <div>
          <h2 className="text-base font-bold text-blue-600 mb-2">▎自我评价</h2>
          <p className="text-slate-600 pl-4">{selfEvaluation}</p>
        </div>
      )}
    </div>
  );
}

function CreativeTemplate({ basicInfo, education, workExperience, projectExperience, skills, selfEvaluation }: TemplateProps) {
  return (
    <div className="p-8 text-sm">
      <div className="flex gap-6 mb-6">
        {basicInfo.avatar && (
          <img src={basicInfo.avatar} alt="头像" className="w-24 h-24 rounded-xl object-cover" />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{basicInfo.name || '姓名'}</h1>
          <p className="text-lg text-purple-600 mb-3">{basicInfo.jobIntent || '求职意向'}</p>
          <div className="flex flex-wrap gap-3">
            {basicInfo.phone && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">📱 {basicInfo.phone}</span>
            )}
            {basicInfo.email && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">✉️ {basicInfo.email}</span>
            )}
            {basicInfo.personalWebsite && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">🌐 {basicInfo.personalWebsite}</span>
            )}
          </div>
        </div>
      </div>

      {education.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-purple-600 mb-2">🎓 教育背景</h2>
          {education.map((item) => (
            <div key={item.id} className="mb-2 pl-4 border-l-2 border-purple-200">
              <div className="flex justify-between">
                <span className="font-medium">{item.school}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-slate-600">{item.major} | {item.degree}</p>
            </div>
          ))}
        </div>
      )}

      {workExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-purple-600 mb-2">💼 工作经历</h2>
          {workExperience.map((item) => (
            <div key={item.id} className="mb-3 pl-4 border-l-2 border-purple-200">
              <div className="flex justify-between">
                <span className="font-medium">{item.company}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-purple-600">{item.position}</p>
              {item.description && <p className="text-slate-600 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {projectExperience.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-purple-600 mb-2">🚀 项目经验</h2>
          {projectExperience.map((item) => (
            <div key={item.id} className="mb-3 pl-4 border-l-2 border-purple-200">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-slate-500">{item.timeRange}</span>
              </div>
              <p className="text-purple-600">{item.role}</p>
              {item.description && <p className="text-slate-600 mt-1">{item.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-base font-bold text-purple-600 mb-2">⚡ 专业技能</h2>
          <div className="flex flex-wrap gap-2 pl-4">
            {skills.map((s) => (
              <span key={s.id} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {selfEvaluation && (
        <div>
          <h2 className="text-base font-bold text-purple-600 mb-2">✨ 自我评价</h2>
          <p className="text-slate-600 pl-4">{selfEvaluation}</p>
        </div>
      )}
    </div>
  );
}
