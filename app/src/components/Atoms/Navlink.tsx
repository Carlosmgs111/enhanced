export const Navlink = ({ link, children }: { link: string; children: string }) => {
  return (
    <li className="text-gray-500 hover:text-gray-900 hover:animate-flash">
      <a className="px-4 py-2 block border-l-2 border-transparent hover:border-gray-900 hover:bg-gray-50" href={link}>
        {children}
      </a>
    </li>
  );
};
