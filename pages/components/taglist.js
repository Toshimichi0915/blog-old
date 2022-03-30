import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from "next/link"
import classNames from "classnames"

export default function TagList({ posts }) {
  let tags = {}
  for (const post in posts) {
    for (const tag of posts[post].tags) {
      let arr = tags[tag] || []
      tags[tag] = arr
      arr.push(post)
    }
  }

  return (
    <div className="bg-slate-200 h-full rounded-md p-5">
      {Object.keys(tags).map(tag => {
        return (
          <Disclosure key={tag}>
            {({ open }) => {
              return (
                <>
                  <Disclosure.Button className="text-center flex">
                    <ChevronUpIcon
                      className={classNames(open ? "rotate-180" : "rotate-90", "transform w-5 h-5 duration-150 my-1")}
                    />
                    <p>{tag}</p>
                  </Disclosure.Button>
                  <Disclosure.Panel>
                    {tags[tag].map(post => {
                      return (
                        <Link key={post} href={`/posts/${post}`}>
                          <a>
                            <p key={post}>{posts[post].name}</p>
                          </a>
                        </Link>
                      )
                    })}
                  </Disclosure.Panel>
                </>
              )
            }}
          </Disclosure>
        )
      })}
    </div>
  )
}
