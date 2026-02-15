import { FiEdit3, FiDownload, FiLayout, FiZap } from 'react-icons/fi';

export default function LandingPage() {
  const features = [
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'AI智能生成',
      description: '输入关键信息，AI自动生成专业简历内容',
    },
    {
      icon: <FiEdit3 className="w-8 h-8" />,
      title: '可视化编辑',
      description: '所见即所得的在线编辑，预览实时同步',
    },
    {
      icon: <FiLayout className="w-8 h-8" />,
      title: '多套模板',
      description: '简约商务、校招应届、互联网创意多风格选择',
    },
    {
      icon: <FiDownload className="w-8 h-8" />,
      title: '一键导出PDF',
      description: '高保真导出，排版样式100%一致',
    },
  ];

  const goToEditor = () => {
    window.location.hash = '#/editor';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">AI智能简历</h1>
        </div>
      </header>

      <main className="container mx-auto px-6">
        <section className="py-20 text-center">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            快速制作专业简历
          </h2>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            AI辅助内容创作 · 可视化在线编辑 · 一键高保真PDF导出
          </p>
          <button
            onClick={goToEditor}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 transition-all hover:shadow-lg hover:shadow-blue-600/25"
          >
            立即制作简历
          </button>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-6 py-8 mt-20 border-t border-slate-200">
        <div className="flex justify-between items-center text-sm text-slate-500">
          <p>© 2026 AI智能简历. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-700">隐私政策</a>
            <a href="#" className="hover:text-slate-700">用户协议</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
