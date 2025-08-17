
const Ufooter = () => {
  return (
    <footer className="py-4  px-4 w-full bg-secondary  flex flex-col text-center md:flex-row justify-between  gap-4 text-sm text-muted-foreground">
      <p>© 2025 MentorMatch. All rights reserved.</p>
      <div className="flex items-center justify-center space-x-6">
        <a href="#" className="hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Cookie Policy
        </a>
      </div>
    </footer>
  );
};

export default Ufooter;
