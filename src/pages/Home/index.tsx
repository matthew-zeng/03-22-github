import React, { useState } from 'react'

//components
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import ResultPanel from './components/MainPanel';

import octokit from 'service/apiService';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

import { UserItemProp } from './types';

export default function Home() {
  const [query, setQuery] = useState<string>('')
  const [users, setUsers] = useState<Array<UserItemProp>>([])
  const [loading, setLoading] = useState<boolean>(false);

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const { data } = await octokit.request(`GET /search/users?q=${query}`)
      return data?.items.map((v: any)  => {
        return {
          username: v.login
        }
      })
    } catch(err) {
      toast.error('There is error when fetching user list. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      console.error(err);
      return null;
    } finally{
      setLoading(false);
    }
  }

  const handleSearchUsers = async () => {
    if(query) {
      const items = await fetchUsers();
      setUsers(items);
    }
  }

  return (
    <div className='w-[calc(100%-30px)] md:max-w-[400px] mx-auto m-[40px] md:my-[10vh]'>
      <div className='h-[80px]'>
        <Input className='w-full' placeholder="username" value={query} onChange={handleQueryInput}/>
        <Button label='Search' onClick={handleSearchUsers} className="mt-[10px]"/>
      </div>
      {loading ? (
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
      ) : (
        <div className='flex1'>
          {query && (
            <p className='text-base text-[#6A6A6A] my-[10px]'>Showing users for "{query}"</p>
          )}
          <ResultPanel users={users}/>
        </div>
      )}
    </div>
  )
}