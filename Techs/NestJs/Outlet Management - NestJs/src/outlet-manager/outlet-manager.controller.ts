import { Body, Controller, Get, Param, Post, UseGuards, Query, NotFoundException, HttpStatus, HttpCode } from "@nestjs/common";
import { OutletService } from "./outlet-manager.service";
import { OutletDto } from "src/dto/outlet.dto";
import { User } from "src/entity/user.entity";
import { GetUser } from "src/decorator/get-user.decorator";
import { Serialize } from "src/interceptor/serealize.interceptor";
import { JwtGuard } from "src/guards/jwt.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { OutletManagerGuard } from "src/guards/outlet-manager.guard";
import { OutletProductFilterDto } from "src/dto/outlet-product-filter.dto";
import { OutletProductsDto } from "src/dto/outlet-products.dto";
import { OutletProductsResponseDto } from "src/responses dto/outlet-product-response.dto";


@UseGuards(JwtGuard, OutletManagerGuard)
@ApiTags('Outlet_Manager-Api')
@ApiBearerAuth('access-token')
@Controller('outlet')
export class OutletManagerController{
    constructor(private readonly outletService: OutletService){}

    @HttpCode(201)
    @Serialize(OutletDto)
    @Post('add-outlet')
    addOutlet(@Body() outletDto: OutletDto, @GetUser() manager: User): Promise<OutletDto>{
        return this.outletService.addOutlet(outletDto, manager)
    }

    @HttpCode(201)
    @Post('/add-outlet-products/:productId')
     async addOutletProduct(
      @Param('productId') productId: string,
      @Query('quantity') quantity: number,
      @GetUser() manager: User,
    ): Promise<OutletProductsDto> {

        const outlet = await this.outletService.findByManagerId(manager);
        if(!outlet){
            throw new NotFoundException('Outlet Not found!')
        } 

        return this.outletService.buyOutletProducts(parseInt(productId), outlet[0], quantity) 
    }


    @HttpCode(201)
    @Post('/sell-outlet-products/:productId')
    async sellOutletProducts(
     @Param('productId') productId: string,
     @Query('quantity') quantity: number,
     @GetUser() manager: User,
   ): Promise<OutletProductsDto> {
       const outlet = await this.outletService.findByManagerId(manager)
       if(!outlet){
        throw new NotFoundException('Outlet Not found!')
      } 

       return this.outletService.sellOutletProducts(parseInt(productId), outlet[0], quantity) 
   }


   @HttpCode(200)
   @Get('/filter')
   getOutletProductsFilter(@Query() query: OutletProductFilterDto, @GetUser() manager: User): Promise<OutletProductsResponseDto[]>{
    query.managerId = manager.id
    return this.outletService.getOutletProductFilter(query)
   }
}