import { FiX } from 'react-icons/fi';
import { useResumeStore } from '../store/resumeStore';
import { TemplateType } from '../types/resume';

interface TemplateSelectorProps {
  onClose: () => void;
}

const templates = [
  {
    id: 'simple' as TemplateType,
    name: '简约商务风',
    description: '简洁大方，适合传统行业求职',
    preview: 'bg-white border border-slate-200',
  },
  {
    id: 'campus' as TemplateType,
    name: '校招应届生风',
    description: '清新蓝调，适合校招场景',
    preview: 'bg-blue-600 text-white',
  },
  {
    id: 'creative' as TemplateType,
    name: '互联网创意风',
    description: '活力紫色，适合互联网行业',
    preview: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white',
  },
];

export default function TemplateSelector({ onClose }: TemplateSelectorProps) {
  const { template, setTemplate } = useResumeStore();

  const handleSelect = (id: TemplateType) => {
    setTemplate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[800px] max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold">选择简历模板</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`p-4 rounded-xl border-2 transition-all hover:shadow-lg text-left ${
                template === t.id
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className={`h-32 rounded-lg mb-3 ${t.preview} flex items-center justify-center`}>
                <span className="text-xs opacity-50">简历预览</span>
              </div>
              <h3 className="font-medium text-slate-900 mb-1">{t.name}</h3>
              <p className="text-sm text-slate-500">{t.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
