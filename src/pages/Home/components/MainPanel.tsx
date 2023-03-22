import React, { useState } from 'react'
import clsx from 'clsx'
import _ from 'lodash'
import octokit from 'service/apiService'
import { toast } from 'react-toastify';

import { UserItemProp, RepositoryItemProp } from '../types'
import UserItem from './UserItem'

type Props = {
  users: Array<UserItemProp>,
  className?: string
}

export default function MainPanel({
  users,
  className = ''
}: Props) {
  const [reposList, setReposList] = useState<any>([]);
  const [loadingUsername, setLoadingUsername] = useState<string>('')

  const fetchRepos = async (username: string) => {
    try {
      setLoadingUsername(username);
      const { data } = await octokit.request(`GET /users/${username}/repos`);
      setReposList((prev: any) => [...prev, {
        username,
        repos: data.map((v: any) => {
          return {
            title: v.full_name,
            description: v.description,
            favorites: v.stargazers_count
          }
        })
      }])
    } catch(err) {
      console.error(err)
      toast.error('There is error when fetching the repos for this user. Please try again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoadingUsername('')
    }
  }

  const handleShowReposList = (param: boolean, username: string) => {
    if(param) return;
    let repos = _.find(reposList, (value: {username: string, repos: [RepositoryItemProp]}, index: number) => value.username === username);
    if(!repos) {
      fetchRepos(username);
    }
  }

  return (
    <div className={clsx("w-full", className)}>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white space-y-[10px]">
        {users.map((v) => (
          <UserItem user={v} handleShowReposList={handleShowReposList} reposList={reposList} loading={loadingUsername === v.username}/>
        ))}
      </div>
    </div>
  )
}