<?php

namespace App\Ny;


class WorkContainer
{

    private $works;

    public function __construct()
    {
        $this->works = collect();
    }

    /**
     * @param Work $work
     * @return WorkContainer
     */
    public function addWork(Work $work)
    {
        if ($oldWork = $this->works->get($work->getKey(), null)) {
            $this->works
                ->put($work->getKey(), $oldWork->mergeWith($work));
        }
        else {
            $this->works->put($work->getKey(), $work);
        }

        return $this;
    }

    /**
     * @param Work $work
     * @return $this
     */
    public function replaceWork(Work $work)
    {
        $this->works->put($work->getKey(), $work);

        return $this;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function works()
    {
        return $this->works;
    }

}