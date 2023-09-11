import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductDto } from "src/dto/product.dto";
import { AdminService } from "./admin.service";
import { Serialize } from "src/interceptor/serealize.interceptor";
import { JwtGuard } from "src/guards/jwt.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { OutletStatusDto } from "src/dto/outlet-status.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AdminOutletFilterDto } from "src/dto/admin-outlet-filter.dto";
import { OutletDto } from "src/dto/outlet.dto";

@UseGuards(JwtGuard, AdminGuard)
@ApiTags('Admin-Api')
@ApiBearerAuth('access-token')
@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}

    
    @HttpCode(201)
    @Serialize(ProductDto)
    @Post('add-product')
    addProduct(@Body() productDto: ProductDto): Promise<ProductDto>{
        return this.adminService.addProduct(productDto)
    }

    @HttpCode(200)
    @Patch('outlet-status/:id')
    changeOutletStatus(@Param('id') id: string, @Body() status: OutletStatusDto): Promise<OutletDto>{
        return this.adminService.changeOutletStatus(parseInt(id), status)
    }

    @HttpCode(200)
    @Get('outlet/:id')
    async getSingleOutlet(@Param('id') id: string): Promise<OutletDto>{
       const outlet = await this.adminService.getSingleOutlet(parseInt(id));
        return outlet;
    }

    @HttpCode(200)
    @Get('outlets')
    getAllOutlets(@Query() query: AdminOutletFilterDto): Promise<OutletDto[]>{

        return this.adminService.getOutletsFilter(query)
    }

    @HttpCode(200)
    @Get('/products/aggregate-status')
    getAggregateProductStatus(@Query() query: AdminOutletFilterDto): Promise<Object[]>{
        
        if(query.city && query.state){
            return this.adminService.getCityStateProduct(query)            
        }

        if(query.city){
            return this.adminService.getCityProduct(query)
        }

        if(query.state){
            return this.adminService.getStateProduct(query)
        }


        if(query.id){
             return this.adminService.getSingleOutletProductStaus(query)
        }

        return this.adminService.getAllOutetProductStatus();
    }
    

} 