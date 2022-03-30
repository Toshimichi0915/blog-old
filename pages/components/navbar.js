import classNames from "classnames";
import Link from "next/link";

const navigation = {
  home: {
    name: "Home",
    link: "/",
  },
  github: {
    name: "GitHub",
    link: "https://github.com/Toshimichi0915",
  }
}

export default function Navbar({ name }) {
  return (
    <>
      <div className="fixed w-full h-12 gap-3 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-400">
        {Object.keys(navigation).map(item => {
          return (
            <Link key={item} href={navigation[item].link}>
              <a>
                <p
                  className={classNames("rounded-md py-1 px-3 text-white hover:bg-emerald-400 ease-linear duration-150",
                    { "bg-blue-400": item === name })}>{navigation[item].name}</p>
              </a>
            </Link>
          )
        })}
      </div>
      <div className="h-12" />
    </>
  )
}
