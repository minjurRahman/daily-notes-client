import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthProvider';
import Loader from '../Shared/Loader/Loader';
import TaskDetails from './TaskDetails';

const MyTasks = () => {
    const { user } = useContext(AuthContext)

    //Get all of my added task
    const { data: myTasks = [], refetch, isLoading } = useQuery({
        queryKey: ['myTasks', user?.email],
        queryFn: async () => {
            const tasks = await fetch(`https://todo-list-server-fawn.vercel.app/mytasks?email=${user?.email}`)
            const data = await tasks.json()
            return data
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='w-11/12 lg:w-10/12 mx-auto my-5'>
            {
                myTasks.length ?
                    <>
                        {/* <div className='lg:flex justify-between'>
                            <div>
                                <h1 className='text-3xl lg:text-4xl text-primary font-semibold'>All Added <span className='text-secondary'>Tasks</span></h1>
                                <p className='text-xl lg:text-xl font-semibold font-poppins text-primary lg:mt-5'>
                                    Track your tasks and take action...
                                </p>
                            </div>
                            <Link to='/completeTasks'>
                                <button className='doRoutineBtn'>Completed Tasks</button>
                            </Link>
                        </div> */}

                        <div className='grid lg:grid-cols-3 gap-5 mt-3 lg:mt-8'>
                            {
                                myTasks.map(task => <TaskDetails
                                    key={task._id}
                                    task={task}
                                    refetch={refetch}
                                ></TaskDetails>)
                            }
                        </div>
                    </>
                    :
                    <div>
                        <h1 className='text-3xl lg:text-4xl font-normal text-gray-900 dark:text-white'>You don't have Any Tasks</h1>
                        <p className='text-xl lg:text-2xl font-semibold font-poppins text-primary mt-5'>
                            Once you add it will appear here..
                        </p>
                    </div>
            }
        </div>
    );
};

export default MyTasks;