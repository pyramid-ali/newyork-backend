@extends('company.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="off-canvas-wrapper dashboard-wrapper" id="dashboard">
        <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper="">
            <div class="off-canvas position-left reveal-for-large" id="sidebar" data-off-canvas="" data-position="left" aria-hidden="true" data-offcanvas="h4293v-offcanvas">
                <header class="sidebar-header">
                    <h3 class="title-bar-title">{{ Route::input('company')->name }}</h3>
                </header>
                <section class="menu-wrapper dashboard-menu">
                    <ul class="vertical menu accordion-menu" data-accordion-menu>
                        @if (Auth::user()->isAdmin())
                            <li>
                                <a href="#"><i class="fa fa-user-circle-o"></i>Managers</a>
                                <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'managers.') ? 'is-active' : '' }}">
                                    <li class="{{ Route::currentRouteName() === 'managers.index' ? 'active' : '' }}"><a href="/managers"><i class="fa fa-eye"></i>View</a></li>
                                    <li class="{{ Route::currentRouteName() === 'managers.create' ? 'active' : '' }}"><a href="/managers/create"><i class="fa fa-plus"></i>Create</a></li>
                                </ul>
                            </li>
                        @endif
                        <li>
                            <a href="#"><i class="fa fa-users"></i>Employees</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'employees.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'employees.index' ? 'active' : '' }}"><a href="/employees"><i class="fa fa-eye"></i>View</a></li>
                                <li class="{{ Route::currentRouteName() === 'employees.create' ? 'active' : '' }}"><a href="/employees/create"><i class="fa fa-plus"></i>Create</a></li>
                                <li class="{{ Route::currentRouteName() === 'employees.import.show' ? 'active' : '' }}"><a href="/employees/import"><i class="fa fa-inbox"></i>import</a></li>
                                <li class="{{ Route::currentRouteName() === 'employees.export.show' ? 'active' : '' }}"><a href="/employees/export"><i class="fa fa-exchange"></i>export</a></li>
                            </ul>
                        </li>
                            <li>
                                <a href="#"><i class="fa fa-building-o"></i>Offices</a>
                                <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'offices.') ? 'is-active' : '' }}">
                                    <li class="{{ Route::currentRouteName() === 'offices.index' ? 'active' : '' }}"><a href="/offices"><i class="fa fa-eye"></i>View</a></li>
                                    <li class="{{ Route::currentRouteName() === 'offices.create' ? 'active' : '' }}"><a href="/offices/create"><i class="fa fa-plus"></i>Create</a></li>
                                </ul>
                            </li>
                        <li>
                            <a href="#"><i class="fa fa-bolt"></i>Service Codes</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'service_codes.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'service_codes.index' ? 'active' : '' }}"><a href="/service_codes"><i class="fa fa-eye"></i>View</a></li>
                                <li class="{{ Route::currentRouteName() === 'service_codes.create' ? 'active' : '' }}"><a href="/service_codes/create"><i class="fa fa-plus"></i>Create</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-empire"></i>Payroll</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'payroll.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'payroll.history' ? 'active' : '' }}"><a href="/payroll/history"><i class="fa fa-history"></i>History</a></li>
                                <li class="{{ Route::currentRouteName() === 'payroll.process.show' ? 'active' : '' }}"><a href="/payroll/process"><i class="fa fa-calculator"></i>process</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-gears"></i>Settings</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'settings.') ? 'is-active' : '' }}">
                                @if (Auth::user()->isAdmin())
                                    <li class="{{ Route::currentRouteName() === 'settings.general.show' ? 'active' : '' }}"><a href="/settings/general"><i class="fa fa-gear"></i>General</a></li>
                                @endIf
                                <li class="{{ Route::currentRouteName() === 'settings.change_password.show' ? 'active' : '' }}"><a href="/settings/change_password"><i class="fa fa-key"></i>Change Password</a></li>
                            </ul>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="off-canvas-content" data-off-canvas-content="">
                <button class="open-sidebar-menu hide-for-large" type="button" data-open="sidebar" aria-expanded="false" aria-controls="sidebar"><i class="fa fa-bars"></i></button>
                <div class="grid-y large-grid-frame wrapper">
                    <div class="cell shrink header medium-cell-block-container">
                        <div class="top-bar">
                            <div class="top-bar-right">
                                <ul class="menu dashboard-top">
                                    <li class="menu-text">
                                        {{ Auth::user()->name }} ({{ Auth::user()->email }})
                                    </li>
                                    <li>
                                        <a class="button alert"
                                           href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">Logout</a>
                                        <form id="logout-form" action="{{ route('company.logout', ['company' => Route::input('company')->name]) }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="cell medium-auto medium-cell-block-container view-wrapper">
                        <div class="grid-x grid-padding-x">

                            <div class="cell auto medium-cell-block-y">
                                @yield('dashboard-content')
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

@endsection