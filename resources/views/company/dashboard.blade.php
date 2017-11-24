@extends('moderator.layout')

@section('title', 'Dashboard')

@section('content')

    <div class="off-canvas-wrapper dashboard-wrapper" id="dashboard">
        <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper="">
            <div class="off-canvas position-left reveal-for-large" id="sidebar" data-off-canvas="" data-position="left" aria-hidden="true" data-offcanvas="h4293v-offcanvas">
                <header class="sidebar-header">
                    <h3>Homacare</h3>
                </header>
                <section class="menu-wrapper">
                    <ul class="vertical menu accordion-menu" data-accordion-menu>
                        @if (Auth::user()->isAdmin())
                            <li>
                                <a href="#"><i class="fa fa-user-circle-o"></i>Managers</a>
                                <ul class="menu vertical nested">
                                    <li><a href="/managers"><i class="fa fa-eye"></i>View</a></li>
                                    <li><a href="/managers/create"><i class="fa fa-plus"></i>Create</a></li>
                                </ul>
                            </li>
                        @endif
                        <li>
                            <a href="#"><i class="fa fa-users"></i>Employees</a>
                            <ul class="menu vertical nested">
                                <li><a href="/employees"><i class="fa fa-eye"></i>View</a></li>
                                <li><a href="/employees/create"><i class="fa fa-plus"></i>Create</a></li>
                                <li><a href="/employees/import"><i class="fa fa-inbox"></i>import</a></li>
                                <li><a href="/employees/export"><i class="fa fa-exchange"></i>export</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-bolt"></i>Service Codes</a>
                            <ul class="menu vertical nested">
                                <li><a href="/service_codes"><i class="fa fa-eye"></i>View</a></li>
                                <li><a href="/service_codes/create"><i class="fa fa-plus"></i>Create</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-empire"></i>Payroll</a>
                            <ul class="menu vertical nested">
                                <li><a href="/payroll/history"><i class="fa fa-history"></i>History</a></li>
                                <li><a href="/payroll/process"><i class="fa fa-calculator"></i>process</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-gears"></i>Settings</a>
                            <ul class="menu vertical nested">
                                @if (Auth::user()->isAdmin())
                                    <li><a href="/settings/general"><i class="fa fa-gear"></i>General</a></li>
                                @endIf
                                <li><a href="/settings/change_password"><i class="fa fa-key"></i>Change Password</a></li>
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
                                    <li>
                                        <a class="button alert"
                                           href="{{ route('logout') }}"
                                           onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">Logout</a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="cell medium-auto medium-cell-block-container">
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