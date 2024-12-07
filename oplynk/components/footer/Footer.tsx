

const Footer = () => {
  return (
    <section className="">
      <footer className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-3 shadow-2xl border">
      <div>
				<h1 className="text-xl font-extrabold textcolor">Oplynk</h1>
			</div>
        <div>
          <p className="text-sm">&copy; {new Date().getFullYear()} Oplynk All rights reserved</p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
