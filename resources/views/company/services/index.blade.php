@extends('company.dashboard')

@section('dashboard-content')

    <div class="grid-x align-center">
        <div class="cell large-8 medium-10 small-12">
            <header>
                <h3>
                    <i class="fa fa-user"></i> Service Codes
                    <a class="button success" href="service_codes/create"><i class="fa fa-plus"></i> Add New</a>
                </h3>
            </header>

            <div class="users-table">
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Rate</td>
                            <td>Unit</td>
                            <td>Company created</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                    @foreach($serviceCodes as $serviceCode)
                        <tr>
                            <td>{{ $serviceCode->name }}</td>
                            <td>{{ $serviceCode->rate }}</td>
                            <td>{{ $serviceCode->unit }}</td>
                            <td><a href="{{ route('service_codes.show', ['service_code' => $serviceCode->id, 'company' => $company->name]) }}"><i class="fa fa-eye"></i></a></td>
                            <td><a href="{{ route('service_codes.edit', ['service_code' => $serviceCode->id, 'company' => $company->name]) }}"><i class="fa fa-pencil"></i></a></td>
                            <td class="alert">
                                <a href="{{ route('service_codes.destroy', ['service_code' => $serviceCode->id, 'company' => $company->name]) }}"
                                   onclick="event.preventDefault();
                                             document.getElementById('{{ 'delete' . $serviceCode->id }}').submit();"><i class="fa fa-trash"></i></a>
                                <form id="{{ 'delete' . $serviceCode->id }}" action="{{ route('service_codes.destroy', ['service_code' => $serviceCode->id, 'company' => $company->name]) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    {{ method_field('delete') }}
                                </form>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            {{ $serviceCodes->links() }}
        </div>
    </div>

@endsection
