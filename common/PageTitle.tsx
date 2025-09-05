interface PageTitleProps {
  title: string;
  subtitle?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 mt-16 text-center">
      <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
      {subtitle && (
        <p className="mt-2 text-slate-600">{subtitle}</p>
      )}
    </div>
  );
};

export default PageTitle;