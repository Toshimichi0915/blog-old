import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from '@heroicons/react/solid'
import Link from "next/link"
import classNames from "classnames"
import { sortPosts } from "../lib/posts"

export default function TagList({ posts }) {
  let tags = {}
  for (const post of sortPosts(posts)) {
    for (const tag of post.tags) {
      let arr = tags[tag] || []
      tags[tag] = arr
      arr.push(post)
    }
  }

  return (
    <div className="bg-slate-200 md:h-96 rounded-md p-5">
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
                        <Link key={post} href={`/posts/${post.id}`}>
                          <a className="text-sm hover:text-blue-400">
                            <p>{post.name}</p>
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
