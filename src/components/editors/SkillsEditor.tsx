import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useResumeStore } from '../../store/resumeStore';

export default function SkillsEditor() {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();
  const { skills } = resumeData;

  return (
    <div className="space-y-5">
      {skills.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          暂无专业技能
        </div>
      ) : (
        skills.map((item) => (
          <div key={item.id} className="bg-slate-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateSkill(item.id, 'name', e.target.value)}
                placeholder="技能名称，例如：JavaScript"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => removeSkill(item.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">熟练度：{['入门', '了解', '熟悉', '精通', '专家'][item.level - 1] || '熟悉'}</label>
              <input
                type="range"
                min="1"
                max="5"
                value={item.level}
                onChange={(e) => updateSkill(item.id, 'level', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        ))
      )}

      <button
        onClick={addSkill}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <FiPlus className="w-5 h-5" />
        添加专业技能
      </button>
    </div>
  );
}
