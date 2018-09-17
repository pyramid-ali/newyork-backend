@extends('moderator.dashboard')

@section('dashboard-content')

    <div class="grid-x">
        <div class="cell">
            <header>
                <h3><i class="fa fa-list"></i> List of Companies</h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Braintree Plan</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($tiers as $tier)
                        <tr>
                            <td><a href="{{ route('service_tiers.show', $tier) }}">{{ $tier->name }}</a></td>
                            <td>{{ str_limit($tier->description, 50) }}</td>
                            <td>{{ $tier->braintree_plan }}</td>
                            <td><a href="{{ route('service_tiers.edit', $tier) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('service_tiers.destroy', $tier) }}"
                                   onclick="event.preventDefault();
                                           document.getElementById('{{ 'delete' . $tier->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $tier->id }}" action="{{ route('service_tiers.destroy', $tier) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>

                @if(session('tier'))
                    <div class="callout alert" data-closable="slide-out-right">
                        <h5>Success.</h5>
                        <p>{{ session('tier') }} Removed successfully</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                @endif
            </div>
            {{ $tiers->links() }}
        </div>
    </div>

@endsection
