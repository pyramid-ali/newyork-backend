@extends('moderator.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="off-canvas-wrapper dashboard-wrapper" id="dashboard">
        <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper="">
            <div class="off-canvas position-left reveal-for-large" id="sidebar" data-off-canvas="" data-position="left" aria-hidden="true" data-offcanvas="h4293v-offcanvas">
                <header class="sidebar-header">
                    <h3>Homacare</h3>
                </header>
                <section class="menu-wrapper dashboard-menu">
                    <ul class="vertical menu accordion-menu" data-accordion-menu>
                        <li>
                            <a href="#"><i class="fa fa-users"></i>Users</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'users.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'users.index' ? 'active' : '' }}"><a href="{{ route('users.index') }}"><i class="fa fa-eye"></i>View</a></li>
                                <li class="{{ Route::currentRouteName() === 'users.create' ? 'active' : '' }}"><a href="{{ route('users.create') }}"><i class="fa fa-plus"></i>Create</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-dashcube"></i>companies</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'companies.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'companies.index' ? 'active' : '' }}"><a href="{{ route('companies.index') }}"><i class="fa fa-eye"></i>View</a></li>
                                <li class="{{ Route::currentRouteName() === 'companies.create' ? 'active' : '' }}"><a href="{{ route('companies.create') }}"><i class="fa fa-plus"></i>Create</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-dashcube"></i>payrolls</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'payrolls.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'payrolls.index' ? 'active' : '' }}"><a href="{{ route('payrolls.index') }}"><i class="fa fa-eye"></i>View</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-dashcube"></i>Service Tiers</a>
                            <ul class="menu vertical nested {{ str_contains(Route::currentRouteName(), 'service_tiers.') ? 'is-active' : '' }}">
                                <li class="{{ Route::currentRouteName() === 'service_tiers.index' ? 'active' : '' }}"><a href="{{ route('service_tiers.index') }}"><i class="fa fa-eye"></i>View</a></li>
                                <li class="{{ Route::currentRouteName() === 'service_tiers.create' ? 'active' : '' }}"><a href="{{ route('service_tiers.create') }}"><i class="fa fa-plus"></i>Create</a></li>
                                <li class="{{ Route::currentRouteName() === 'service_tiers.braintree.index' ? 'active' : '' }}"><a href="{{ route('service_tiers.braintree.index') }}"><i class="fa fa-paypal"></i>Brain Tree Plans</a></li>
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
                                <ul class="menu">
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