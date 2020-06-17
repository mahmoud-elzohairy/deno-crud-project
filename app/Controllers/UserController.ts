import User from "../Models/User.ts";
import Validator from "../Validator.ts";
import Response from "../Handler/response.ts";

export default {
  async usersCount(ctx: any) {
    const { value } = await ctx.request.body();

    const usersCounts = await User.count(value);
    ctx.response.body = {
      data: usersCounts,
    };
  },

  async index(ctx: any) {
    const allUsers = await User.all();
    ctx.response.body = {
      data: allUsers,
    };
  },

  async show(ctx: any) {
    const user = await User.findOne(ctx.params.id);
    ctx.response.body = {
      status: true,
      data: user,
    };
  },

  async storeOne(ctx: any) {
    const rules: any = {
      username: "required|string|min:6|max:20",
      email: "required|string|email|unique:users",
      age: "required|numeric",
    };

    const value = await Validator.validate(ctx, rules);

    if (value) {
      const insertId = await User.insertOne(value);
      const newUser = await User.findOne(insertId.$oid);

      Response.successResponse(
        ctx,
        newUser,
        "New record inserted successfully.",
      );
    }
  },

  async storeMany(ctx: any) {
    const { value } = await ctx.request.body();

    const insertIds = await User.insertMany(value.users);

    const resultRows: any = [];
    for (const dataObject of insertIds) {
      const user = await User.findOne(dataObject.$oid);
      resultRows.push(user);
    }

    ctx.response.body = {
      status: true,
      data: resultRows,
      message: "New records inserted successfully.",
    };
  },

  async updateOne(ctx: any) {
    const { value } = await ctx.request.body();

    const updatedRow = await User.updateOne(
      { _id: { $oid: ctx.params.id } },
      value,
    );

    const user = await User.findOne(ctx.params.id);

    ctx.response.body = {
      status: true,
      data: user,
      message: "Record updated successfully with ID: " + ctx.params.id,
    };
  },

  async updateMany(ctx: any) {
    const { value } = await ctx.request.body();

    const updatedRow = await User.updateMany(
      { age: ctx.params.age },
      { $set: { name: value.name } },
    );

    const users = await User.findWithCondition({ age: ctx.params.age });

    ctx.response.body = {
      status: true,
      data: users,
      message: "Records updated successfully with Age: " + ctx.params.age,
    };
  },

  async destroyOne(ctx: any) {
    const userCount = await User.deleteOne(ctx.params.id);

    ctx.response.body = {
      status: true,
      message: "Record deleted successfully with ID: " + ctx.params.id,
    };
  },

  async destroyMany(ctx: any) {
    const userCount = await User.deleteMany({ age: ctx.params.age });

    ctx.response.body = {
      status: true,
      deletedCount: userCount,
      message: "Records deleted successfully with Age: " + ctx.params.age,
    };
  },
};
