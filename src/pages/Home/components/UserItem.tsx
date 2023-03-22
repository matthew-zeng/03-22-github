import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, StarIcon } from '@heroicons/react/20/solid'
import _ from 'lodash'
import { TailSpin } from 'react-loader-spinner'

import { UserItemProp, RepositoryItemProp } from '../types'

type Props = {
  handleShowReposList: (open: boolean, username: string) => void,
  user: UserItemProp,
  reposList: Array<{username: string, repos: [RepositoryItemProp]}>,
  loading: boolean
}

export default function UserItem({
  handleShowReposList,
  user,
  reposList,
  loading
}: Props) {

  const repos = _.find(reposList, (v: {username: string, repos: [RepositoryItemProp]}) => v.username === user.username)

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button onClick={() => handleShowReposList(open, user.username)} className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
            <span className='text-base'>{user.username}</span>
            <ChevronUpIcon
              className={`${
                open ? 'rotate-180 transform' : ''
              } h-5 w-5 text-purple-500`}
            />
          </Disclosure.Button>
          {loading && (
            <TailSpin
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
          {(repos && repos.repos.length === Number(0)) && (
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 space-y-[10px]">
              <div>
                Empty
              </div>
            </Disclosure.Panel>
            
          )}
          {repos && repos.repos.length > 0 && (
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 space-y-[10px]">
            {repos.repos.map(repo => (
              <div className='bg-[#E4E4E4] flex justify-between py-[10px] px-[5px] gap-x-[20px] items-start'>
                <div className='space-y-[5px]'>
                  <div className='font-bold text-base'>{repo.title}</div>
                  <div className='text-base'>{repo.description}</div>
                </div>
                <div className='text-base font-bold flex items-center space-x-[15px]'>
                  {repo.favorites}
                  <StarIcon className='w-[20px] h-[20px] ml-[4px]'/>
                </div>
              </div>
            ))}
            </Disclosure.Panel>
          )} 
          
        </>
      )}
    </Disclosure>
  )
}