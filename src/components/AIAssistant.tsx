import { useState } from 'react';
import { FiX, FiZap, FiSend, FiCheck } from 'react-icons/fi';
import { useResumeStore } from '../store/resumeStore';
import { parseResumeWithAI, ParsedResume } from '../utils/api';

interface AIAssistantProps {
  onClose: () => void;
}

type AIFeature = 'generate' | 'polish' | 'match' | 'fill';

export default function AIAssistant({ onClose }: AIAssistantProps) {
  const [feature, setFeature] = useState<AIFeature>('fill');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [error, setError] = useState('');
  const { 
    updateBasicInfo, 
    addEducation,
    addWorkExperience, 
    addProjectExperience, 
    addSkill, 
    updateSelfEvaluation,
  } = useResumeStore();

  const features = [
    { id: 'fill' as AIFeature, name: '智能填充', description: '粘贴经历，AI自动填充' },
    { id: 'generate' as AIFeature, name: 'AI生成', description: '根据关键词生成内容' },
    { id: 'polish' as AIFeature, name: 'AI润色', description: '优化现有内容' },
    { id: 'match' as AIFeature, name: '岗位匹配', description: '分析岗位匹配度' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResult('');
    setError('');

    if (feature === 'fill') {
      try {
        const data = await parseResumeWithAI(prompt);
        setParsedData(data);
      } catch (err) {
        setError('解析失败，请重试');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setTimeout(() => {
      const mockResponses: Record<AIFeature, string> = {
        fill: '',
        generate: `根据您的需求，为您生成以下内容示例：

工作经历描述：
- 负责公司核心产品的前端开发工作，采用React框架重构了旧版系统，提升页面加载速度40%
- 主导完成了用户中心模块的设计与开发，支持每日10万+用户的访问需求
- 与产品经理紧密协作，根据需求文档完成20+功能的开发上线`,

        polish: `【轻度优化】已对内容进行优化：

原文：我在公司做前端开发
优化后：负责公司核心产品的前端开发工作，运用React框架独立完成多个功能模块的开发与优化

主要优化点：
• 使用专业术语替代口语化表达
• 添加具体的技术栈和成果数据
• 采用STAR法则组织语言`,

        match: `【岗位匹配分析】

目标岗位：前端开发工程师

📊 匹配度评估：75%

✅ 您的优势：
• 具有React开发经验
• 有项目经验

⚠️ 建议补充：
• 添加Vue或Angular经验
• 增加性能优化相关项目
• 补充团队协作经验

💡 推荐关键词：
Vue、TypeScript、性能优化、单元测试、微前端`,
      };

      setResult(mockResponses[feature]);
      setIsLoading(false);
    }, 1500);
  };

  const applyParsedData = () => {
    if (!parsedData) return;

    // 填充基本信息
    if (parsedData.basicInfo) {
      const { basicInfo } = parsedData;
      if (basicInfo.name) updateBasicInfo('name', basicInfo.name);
      if (basicInfo.phone) updateBasicInfo('phone', basicInfo.phone);
      if (basicInfo.email) updateBasicInfo('email', basicInfo.email);
      if (basicInfo.jobIntent) updateBasicInfo('jobIntent', basicInfo.jobIntent);
      if (basicInfo.personalWebsite) updateBasicInfo('personalWebsite', basicInfo.personalWebsite);
    }

    // 填充教育背景
    if (parsedData.education && parsedData.education.length > 0) {
      parsedData.education.forEach((edu) => {
        addEducation();
        setTimeout(() => {
          const store = useResumeStore.getState();
          const lastId = store.resumeData.education[store.resumeData.education.length - 1]?.id;
          if (lastId) {
            if (edu.timeRange) store.updateEducation(lastId, 'timeRange', edu.timeRange);
            if (edu.school) store.updateEducation(lastId, 'school', edu.school);
            if (edu.major) store.updateEducation(lastId, 'major', edu.major);
            if (edu.degree) store.updateEducation(lastId, 'degree', edu.degree);
            if (edu.description) store.updateEducation(lastId, 'description', edu.description);
          }
        }, 50);
      });
    }

    // 填充工作经历
    if (parsedData.workExperience && parsedData.workExperience.length > 0) {
      parsedData.workExperience.forEach((work) => {
        addWorkExperience();
        setTimeout(() => {
          const store = useResumeStore.getState();
          const lastId = store.resumeData.workExperience[store.resumeData.workExperience.length - 1]?.id;
          if (lastId) {
            if (work.timeRange) store.updateWorkExperience(lastId, 'timeRange', work.timeRange);
            if (work.company) store.updateWorkExperience(lastId, 'company', work.company);
            if (work.position) store.updateWorkExperience(lastId, 'position', work.position);
            if (work.description) store.updateWorkExperience(lastId, 'description', work.description);
          }
        }, 50);
      });
    }

    // 填充项目经验
    if (parsedData.projectExperience && parsedData.projectExperience.length > 0) {
      parsedData.projectExperience.forEach((proj) => {
        addProjectExperience();
        setTimeout(() => {
          const store = useResumeStore.getState();
          const lastId = store.resumeData.projectExperience[store.resumeData.projectExperience.length - 1]?.id;
          if (lastId) {
            if (proj.timeRange) store.updateProjectExperience(lastId, 'timeRange', proj.timeRange);
            if (proj.name) store.updateProjectExperience(lastId, 'name', proj.name);
            if (proj.role) store.updateProjectExperience(lastId, 'role', proj.role);
            if (proj.description) store.updateProjectExperience(lastId, 'description', proj.description);
          }
        }, 50);
      });
    }

    // 填充技能
    if (parsedData.skills && parsedData.skills.length > 0) {
      parsedData.skills.forEach((skill) => {
        if (skill.name) {
          addSkill();
          setTimeout(() => {
            const store = useResumeStore.getState();
            const lastId = store.resumeData.skills[store.resumeData.skills.length - 1]?.id;
            if (lastId && skill.name) {
              store.updateSkill(lastId, 'name', skill.name);
            }
          }, 50);
        }
      });
    }

    // 填充自我评价
    if (parsedData.selfEvaluation) {
      updateSelfEvaluation(parsedData.selfEvaluation);
    }

    onClose();
  };

  const applyResult = () => {
    if (feature === 'generate' && result) {
      const newWork = {
        id: Math.random().toString(36).substring(2, 9),
        timeRange: '2023.01 - 2024.01',
        company: '示例公司',
        position: '前端开发工程师',
        description: result.split('\n').slice(2).join('\n'),
      };
      addWorkExperience();
      setTimeout(() => {
        const store = useResumeStore.getState();
        const lastId = store.resumeData.workExperience[store.resumeData.workExperience.length - 1]?.id;
        if (lastId) {
          store.updateWorkExperience(lastId, 'company', newWork.company);
          store.updateWorkExperience(lastId, 'position', newWork.position);
          store.updateWorkExperience(lastId, 'description', newWork.description);
        }
      }, 100);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[700px] max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiZap className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-semibold">AI智能助手</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="flex gap-2 mb-6 flex-wrap">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFeature(f.id);
                  setResult('');
                  setParsedData(null);
                  setPrompt('');
                  setError('');
                }}
                className={`py-2 px-3 rounded-lg text-center transition-colors ${
                  feature === f.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <div className="text-sm">{f.name}</div>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {feature === 'fill' ? (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  粘贴您的个人经历描述
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="例如：我叫张三，2020年毕业于北京大学软件工程专业，在腾讯公司担任前端开发工程师3年，负责微信小程序开发..."
                  rows={8}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
                <p className="text-xs text-slate-500 mt-2">
                  提示：粘贴越详细的信息，AI识别越准确
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {feature === 'generate' && '输入关键词或基本信息'}
                  {feature === 'polish' && '输入需要润色的内容'}
                  {feature === 'match' && '输入目标岗位名称或JD'}
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={
                    feature === 'generate'
                      ? '例如：一年前端开发经验，熟悉React...'
                      : feature === 'polish'
                      ? '粘贴需要优化的工作描述...'
                      : '例如：前端开发工程师 要求熟悉Vue React...'
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-opacity"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  AI处理中...
                </>
              ) : (
                <>
                  <FiSend className="w-4 h-4" />
                  {feature === 'fill' ? '开始识别' : '生成'}
                </>
              )}
            </button>

            {/* 智能填充结果预览 */}
            {parsedData && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-purple-700">识别结果预览</span>
                  <button
                    onClick={applyParsedData}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 flex items-center gap-1"
                  >
                    <FiCheck className="w-4 h-4" />
                    确认填充
                  </button>
                </div>
                
                <div className="space-y-3 text-sm">
                  {parsedData.basicInfo && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">基本信息</div>
                      <div className="text-slate-600 text-xs space-y-1">
                        {parsedData.basicInfo.name && <div>姓名: {parsedData.basicInfo.name}</div>}
                        {parsedData.basicInfo.phone && <div>电话: {parsedData.basicInfo.phone}</div>}
                        {parsedData.basicInfo.email && <div>邮箱: {parsedData.basicInfo.email}</div>}
                        {parsedData.basicInfo.jobIntent && <div>求职意向: {parsedData.basicInfo.jobIntent}</div>}
                      </div>
                    </div>
                  )}
                  
                  {parsedData.education && parsedData.education.length > 0 && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">教育背景 ({parsedData.education.length}条)</div>
                      {parsedData.education.map((edu, i) => (
                        <div key={i} className="text-slate-600 text-xs">
                          {edu.school} - {edu.major} ({edu.timeRange})
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {parsedData.workExperience && parsedData.workExperience.length > 0 && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">工作经历 ({parsedData.workExperience.length}条)</div>
                      {parsedData.workExperience.map((work, i) => (
                        <div key={i} className="text-slate-600 text-xs">
                          {work.company} - {work.position} ({work.timeRange})
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {parsedData.projectExperience && parsedData.projectExperience.length > 0 && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">项目经验 ({parsedData.projectExperience.length}条)</div>
                      {parsedData.projectExperience.map((proj, i) => (
                        <div key={i} className="text-slate-600 text-xs">
                          {proj.name} - {proj.role} ({proj.timeRange})
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {parsedData.skills && parsedData.skills.length > 0 && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">专业技能</div>
                      <div className="text-slate-600 text-xs">
                        {parsedData.skills.map(s => s.name).join('、')}
                      </div>
                    </div>
                  )}
                  
                  {parsedData.selfEvaluation && (
                    <div className="bg-white p-3 rounded">
                      <div className="font-medium text-slate-700 mb-1">自我评价</div>
                      <div className="text-slate-600 text-xs">{parsedData.selfEvaluation.substring(0, 100)}...</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {result && feature !== 'fill' && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-700">AI生成结果</span>
                  {feature === 'generate' && (
                    <button
                      onClick={applyResult}
                      className="text-xs text-purple-600 hover:text-purple-800"
                    >
                      一键应用
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-700 whitespace-pre-line">{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
