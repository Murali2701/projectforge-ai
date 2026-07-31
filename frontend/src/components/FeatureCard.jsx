function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-purple-500 hover:-translate-y-1 transition-all duration-300 shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="text-xl font-semibold text-white mb-2">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;