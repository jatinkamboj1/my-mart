export default function PolicyLayout({ title, children }) {
  return (
    <main>
      <div className="service-policy section-padding">
        <div className="container">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-semibold mb-6">{title}</h1>
            <div className="space-y-6 text-sm leading-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}