const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} Lan. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
